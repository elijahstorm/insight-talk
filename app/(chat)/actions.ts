'use server'

import { CoreMessage, generateText, Message, UIMessage } from 'ai'
import { cookies } from 'next/headers'

import {
	deleteMessagesByChatIdAfterTimestamp,
	getMessageById,
	updateChatVisiblityById,
} from '@/lib/db/queries'
import { VisibilityType } from '@/components/visibility-selector'
import { myProvider } from '@/lib/ai/providers'
import {
	InsightPrompts,
	preparePromtWithMessage,
	systemPrompt,
	titleAndSummaryPrompt,
} from '@/lib/ai/system-prompts'

export async function saveChatModelAsCookie(model: string) {
	const cookieStore = await cookies()
	cookieStore.set('chat-model', model)
}

export async function generateTitleFromUserMessage({ message }: { message: Message }) {
	const { text: title } = await generateText({
		model: myProvider.languageModel('title-model'),
		system: `\n
- you will generate a short title based on the first message a user begins a conversation with
- ensure it is not more than 80 characters long
- the title should be a summary of the user's message
- do not use quotes or colons`,
		prompt: JSON.stringify(message),
	})

	return title
}

export async function generateTitleAndSummaryFromUserMessage({
	message,
	relationshipTypes,
	language,
	userName,
}: {
	message: Message
	relationshipTypes: Array<string>
	language: string
	userName?: string
}) {
	const { text } = await generateText({
		model: myProvider.languageModel('title-model'),
		system: titleAndSummaryPrompt({ relationshipTypes, language, userName }),
		prompt: preparePromtWithMessage({ message }),
	})

	const splitIndex = text.indexOf('|')
	if (splitIndex === -1) {
		return { title: text.trim(), summary: '' }
	}

	const title = text.substring(0, splitIndex).trim()
	const summary = text.substring(splitIndex + 1).trim()

	return { title, summary }
}

export async function generateInsight({
	message,
	relationshipTypes,
	language,
	userName,
}: {
	message: Message
	relationshipTypes: Array<string>
	language: string
	userName?: string
}) {
	const [{ text: communicationPatterns }, { text: replies }, { text: insight }] = await Promise.all(
		[
			generateText({
				model: myProvider.languageModel('title-model'),
				system: systemPrompt({
					messageType: InsightPrompts.communicationPatterns,
					relationshipTypes,
					language,
					userName,
				}),
				prompt: preparePromtWithMessage({ message }),
			}),
			generateText({
				model: myProvider.languageModel('title-model'),
				system: systemPrompt({
					messageType: InsightPrompts.replies,
					relationshipTypes,
					language,
					userName,
				}),
				prompt: preparePromtWithMessage({ message }),
			}),
			generateText({
				model: myProvider.languageModel('title-model'),
				system: systemPrompt({
					messageType: InsightPrompts.generalInsight,
					relationshipTypes,
					language,
					userName,
				}),
				prompt: preparePromtWithMessage({ message }),
			}),
		]
	)

	const parseCommunicationPatternPart = (text: string) => {
		const parsePerson = (person: string) => {
			const parseData = (data: string): [string, string, string, string, string] => {
				const [name, style, analysis, ratiosText, descriptionText] = data
					.split('||')
					.map((item) => item.trim().replace(/^\|+|\|+$/g, ''))
				return [name, style, analysis, ratiosText, descriptionText]
			}

			const parseRatios = (ratios?: string): Array<{ type: string; ratio: number }> => {
				return (
					ratios?.split('|').map((ratio) => {
						const [type, ratioValue] = ratio.split(':').map((item) => item.trim())
						return { type, ratio: parseFloat(ratioValue) }
					}) ?? [{ type: 'ERROR', ratio: 0 }]
				)
			}

			const parseDescription = (description?: string): Array<string> => {
				return description?.split('|').map((item) => item.trim()) ?? ['ERROR: no desc']
			}

			const [name, style, analysis, ratiosText, descriptionText] = parseData(person)
			const ratios = parseRatios(ratiosText)
			const description = parseDescription(descriptionText)

			return {
				name,
				style,
				text: analysis,
				ratios,
				description,
			}
		}

		return {
			type: 'com-pattern' as const,
			people: text.split('|||').map((person) => parsePerson(person)),
		}
	}

	const parseRepliesPart = (
		text: string
	): { type: 'replies'; replies: Array<{ title: string; lines: string[] }> } => {
		const replies = text.split('|||').map((reply) => {
			const [title, linesText] = reply.split('||').map((item) => item.trim())
			const lines = linesText?.split('|').map((line) => line.trim()) ?? ['ERROR: no lines']
			return { title, lines }
		})

		return { type: 'replies', replies }
	}

	const parseInsightPart = (text: string) => {
		return { type: 'insight' as const, text: text.split('||').map((item) => item.trim()) }
	}

	const assistantMessages = [
		{
			content: '',
			role: 'assistant',
			createdAt: new Date(),
			parts: [parseCommunicationPatternPart(communicationPatterns), parseInsightPart(insight)],
		},
		{
			content: '',
			role: 'assistant',
			createdAt: new Date(),
			parts: [parseRepliesPart(replies)],
		},
	]

	return { assistantMessages }
}

export async function deleteTrailingMessages({ id }: { id: string }) {
	const [message] = await getMessageById({ id })

	await deleteMessagesByChatIdAfterTimestamp({
		chatId: message.chatId,
		timestamp: message.createdAt,
	})
}

export async function updateChatVisibility({
	chatId,
	visibility,
}: {
	chatId: string
	visibility: VisibilityType
}) {
	await updateChatVisiblityById({ chatId, visibility })
}

export async function messagesToPrompt(messages: Array<UIMessage>) {
	return messages
		.map((message) => {
			const partsText = message.parts
				.map((part) => {
					if (part.type === 'text') {
						return part.text
					}
					return JSON.stringify(part, null, 2)
				})
				.join('\n')

			return `Message from ${message.role} at ${message.createdAt}:\n${partsText}`
		})
		.join('\n\n')
}
