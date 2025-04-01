import { UIMessage } from 'ai'
import { auth } from '@/app/(auth)/auth'
import { newInsight, saveMessages } from '@/lib/db/queries'
import { getMostRecentUserMessage } from '@/lib/utils'
import { generateInsight, generateTitleAndSummaryFromUserMessage } from '@/app/(chat)/actions'

export const maxDuration = 60

export async function POST(request: Request) {
	try {
		const {
			messages,
			language,
			name,
			type = ['NA'],
			visibility = 'private',
		}: {
			messages: Array<UIMessage>
			language: string
			name?: string
			type?: Array<string>
			visibility?: 'private' | 'public'
		} = await request.json()

		const session = await auth()

		if (!session || !session.user || !session.user.id) {
			return new Response('Unauthorized', { status: 401 })
		}

		const message = getMostRecentUserMessage(messages)

		if (!message) {
			return new Response('No user message found', { status: 400 })
		}

		const { title, summary } = await generateTitleAndSummaryFromUserMessage({
			message,
			type,
			language,
			name,
		})

		const chat = await newInsight({ userId: session.user.id, title, summary, type, visibility })

		await saveMessages({
			messages: [
				{
					chatId: chat[0].id,
					id: message.id,
					role: 'user',
					parts: message.parts,
					attachments: message.experimental_attachments ?? [],
					createdAt: new Date(),
				},
			],
		})

		const { assistantMessage } = await generateInsight({ message, type, language, name })

		if (assistantMessage.parts.length === 0) {
			throw new Error('No assistant message found!')
		}

		await saveMessages({
			messages: [
				{
					id: undefined as unknown as string,
					chatId: chat[0].id,
					role: assistantMessage.role,
					parts: assistantMessage.parts,
					attachments: [],
					createdAt: new Date(),
				},
			],
		})

		return Response.json({ chatId: chat[0].id }, { status: 200 })
	} catch (error) {
		console.error('error info - ', error)
		return new Response('An error occurred while processing your request!', {
			status: 404,
		})
	}
}
