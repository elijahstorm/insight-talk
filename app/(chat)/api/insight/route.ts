import { UIMessage } from 'ai'
import { auth } from '@/app/(auth)/auth'
import { newInsight } from '@/lib/db/queries'
import { getMostRecentUserMessage } from '@/lib/utils'
import { generateTitleAndSummaryFromUserMessage } from '@/app/(chat)/actions'

export const maxDuration = 60

export async function POST(request: Request) {
	try {
		const {
			messages,
			type = ['NA'],
			visibility = 'private',
		}: {
			messages: Array<UIMessage>
			type?: Array<string>
			visibility?: 'private' | 'public'
		} = await request.json()

		const session = await auth()

		if (!session || !session.user || !session.user.id) {
			return new Response('Unauthorized', { status: 401 })
		}

		const userMessage = getMostRecentUserMessage(messages)

		if (!userMessage) {
			return new Response('No user message found', { status: 400 })
		}

		const { title, summary } = await generateTitleAndSummaryFromUserMessage({
			message: userMessage,
		})

		const chat = await newInsight({ userId: session.user.id, title, summary, type, visibility })

		return Response.json({ chatId: chat[0].id }, { status: 200 })
	} catch (error) {
		return new Response('An error occurred while processing your request!', {
			status: 404,
		})
	}
}
