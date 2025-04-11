import { UIMessage } from 'ai'
import { auth } from '@/app/(auth)/auth'
import { newInsight, saveMessages } from '@/lib/db/queries'
import { getMostRecentUserMessage } from '@/lib/utils'
import {
	generateInsight,
	generateTitleAndSummaryFromUserMessage,
	reportHasErrors,
} from '@/app/(chat)/actions'
import { languages } from '@/lib/language/dictionary'

export const maxDuration = 60

export async function POST(request: Request) {
	const startTime = new Date()

	try {
		const {
			messages,
			userName,
			chatMemberNames,
			language = languages[0].name,
			type = undefined,
			visibility = 'private',
		}: {
			messages?: Array<UIMessage> | null
			language?: string
			userName?: string | null
			chatMemberNames?: Array<string> | null
			type?: Array<string>
			visibility?: 'private' | 'public'
		} = await request.json()

		if (!messages || !messages.length) {
			return new Response('No message details', { status: 402 })
		}

		const session = await auth()

		if (!session || !session.user || !session.user.id) {
			return new Response('Unauthorized', { status: 401 })
		}

		const message = getMostRecentUserMessage(messages)

		if (!message) {
			return new Response('No user message found', { status: 400 })
		}

		const [{ title, summary }, { assistantMessages }] = await Promise.all([
			generateTitleAndSummaryFromUserMessage({
				message,
				relationshipTypes: type,
				language,
				userName,
				chatMemberNames,
			}),
			generateInsight({ message, relationshipTypes: type, language, userName }),
		])

		if (
			assistantMessages.length === 0 ||
			!assistantMessages.some((message) => message.parts.length > 0)
		) {
			throw new Error('No assistant message found')
		}

		if (await reportHasErrors({ assistantMessages })) {
			throw new Error('Assistant message malformed')
		}

		const chat = await newInsight({
			userId: session.user.id,
			title,
			summary,
			type,
			userName,
			visibility,
		})

		if (!chat) {
			return new Response('Chat room could not be created', { status: 400 })
		}

		await saveMessages({
			messages: [
				{
					id: undefined as unknown as string,
					chatId: chat.id,
					role: 'user',
					parts: message.parts,
					attachments: message.experimental_attachments ?? [],
				},
				...assistantMessages.map((assistantMessage) => ({
					id: undefined as unknown as string,
					chatId: chat.id,
					role: assistantMessage.role,
					parts: assistantMessage.parts,
					attachments: [],
				})),
			].map((message, index) => ({
				...message,
				createdAt: new Date(startTime.getTime() - (assistantMessages.length - index) * 1000),
			})),
		})

		return Response.json({ chatId: chat.id }, { status: 200 })
	} catch (error) {
		console.error('error info - ', error)
		return new Response('An error occurred while processing your request', {
			status: 404,
		})
	}
}
