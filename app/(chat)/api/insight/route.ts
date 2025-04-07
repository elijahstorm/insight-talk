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

		const [{ title, summary }, { assistantMessages }] = await Promise.all([
			generateTitleAndSummaryFromUserMessage({
				message,
				relationshipTypes: type,
				language,
				name,
			}),
			generateInsight({ message, relationshipTypes: type, language, name }),
		])

		if (
			assistantMessages.length === 0 ||
			!assistantMessages.some((message) => message.parts.length > 0)
		) {
			throw new Error('No assistant message found!')
		}

		const chat = await newInsight({
			userId: session.user.id,
			title,
			summary,
			type,
			userName: name,
			visibility,
		})

		if (!chat) {
			return new Response('Chat room could not be created!', { status: 400 })
		}

		await saveMessages({
			messages: [
				{
					id: undefined as unknown as string,
					chatId: chat.id,
					role: 'user',
					parts: message.parts,
					attachments: message.experimental_attachments ?? [],
					createdAt: new Date(),
				},
				...assistantMessages.map((assistantMessage) => ({
					id: undefined as unknown as string,
					chatId: chat.id,
					role: assistantMessage.role,
					parts: assistantMessage.parts,
					attachments: [],
					createdAt: new Date(),
				})),
			],
		})

		return Response.json({ chatId: chat.id }, { status: 200 })
	} catch (error) {
		console.error('error info - ', error)
		return new Response('An error occurred while processing your request!', {
			status: 404,
		})
	}
}
