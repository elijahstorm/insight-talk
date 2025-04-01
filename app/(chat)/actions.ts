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
	const { text } = await generateText({
		model: myProvider.languageModel('title-model'),
		system: `\n
    - Hope this works`, // todo
		prompt: JSON.stringify(message),
	})

	// todo
	// parse response into insight message
	return { text, assistantMessage: message }
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
