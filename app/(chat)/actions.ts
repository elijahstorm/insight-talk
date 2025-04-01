'use server'

import { generateText, Message } from 'ai'
import { cookies } from 'next/headers'

import {
	deleteMessagesByChatIdAfterTimestamp,
	getMessageById,
	updateChatVisiblityById,
} from '@/lib/db/queries'
import { VisibilityType } from '@/components/visibility-selector'
import { myProvider } from '@/lib/ai/providers'
import { InsightMessageType } from '@/components/insight-message'
import { InsightPrompts, systemPrompt } from '@/lib/system-prompts'

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

export async function generateTitleAndSummaryFromUserMessage({ message }: { message: Message }) {
	const { text } = await generateText({
		model: myProvider.languageModel('title-model'),
		system: `\n
    - You will be given a chat log history between two or multiple people.
    - Generate a concise title and a short summary based on the conversation logs provided.
    - Separate the title and summary with a bar | operator.
    - The title should be the first value before the | operator, and it should be a concise representation of the participants or the main topic of the conversation.
    - The summary should be the second value after the | operator, and it should be a short sentence summarizing the conversation. Ensure the summary is longer than the title but no more than 250 characters.
    - Do not use quotes, colons, or any special formatting in the response.
    - Ensure the response format is consistent and easy to parse: [title] | [summary].`,
		prompt: JSON.stringify(message),
	})

	const splitIndex = text.indexOf('|')
	if (splitIndex === -1) {
		return { title: text.trim(), summary: '' }
	}

	const title = text.substring(0, splitIndex).trim()
	const summary = text.substring(splitIndex + 1).trim()

	return { title, summary }
}

export async function generateInsight({ message }: { message: Message }) {
	const { text: communicationPatterns } = await generateText({
		model: myProvider.languageModel('title-model'),
		system: systemPrompt(InsightPrompts.communicationPatterns),
		prompt: JSON.stringify(message),
	})
	const { text: replies } = await generateText({
		model: myProvider.languageModel('title-model'),
		system: systemPrompt(InsightPrompts.replies),
		prompt: JSON.stringify(message),
	})
	const { text: insight } = await generateText({
		model: myProvider.languageModel('title-model'),
		system: systemPrompt(InsightPrompts.generalInsight),
		prompt: JSON.stringify(message),
	})

	const parseCommunicationPatternPart = (text: string) => {
		const parseData = (text: string): [string, string, string, string, string] => {
			const [name, style, analysis, ratiosText, descriptionText] = text
				.split('||')
				.map((item) => item.trim())
			return [name, style, analysis, ratiosText, descriptionText]
		}

		const parseRatios = (ratios: string): Array<{ type: string; ratio: number }> => {
			return ratios.split('|').map((ratio) => {
				const [type, ratioValue] = ratio.split(':').map((item) => item.trim())
				return { type, ratio: parseFloat(ratioValue) }
			})
		}

		const parseDescription = (description: string): Array<string> => {
			return description.split('|').map((item) => item.trim())
		}

		const [name, style, analysis, ratiosText, descriptionText] = parseData(text)
		const ratios = parseRatios(ratiosText)
		const description = parseDescription(descriptionText)

		return {
			type: 'com-pattern' as const,
			name,
			style,
			text: analysis,
			ratios,
			description,
		}
	}

	const parseRepliesPart = (
		text: string
	): { type: 'replies'; replies: Array<{ title: string; lines: string[] }> } => {
		const replies = text.split('|||').map((reply) => {
			const [title, linesText] = reply.split('||').map((item) => item.trim())
			const lines = linesText.split('|').map((line) => line.trim())
			return { title, lines }
		})

		return { type: 'replies', replies }
	}

	const parseInsightPart = (text: string) => {
		return { type: 'insight' as const, text: text.split('||').map((item) => item.trim()) }
	}

	const assistantMessage: InsightMessageType = {
		id: '',
		content: '',
		insight: true,
		role: 'assistant',
		createdAt: new Date(),
		parts: [
			parseCommunicationPatternPart(communicationPatterns),
			parseInsightPart(insight),
			parseRepliesPart(replies),
		],
	}

	return { assistantMessage }
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
