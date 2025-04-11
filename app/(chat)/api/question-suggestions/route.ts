import { Message } from 'ai'
import { auth } from '@/app/(auth)/auth'
import { generateQuestionSuggestions } from '@/app/(chat)/actions'

export const maxDuration = 60

export async function POST(request: Request) {
	try {
		const {
			messages,
			language,
		}: {
			messages: Array<Message>
			language: string
		} = await request.json()

		if (!messages || messages.length === 0) {
			return Response.json([])
		}

		const session = await auth()

		if (!session || !session.user || !session.user.id) {
			return new Response('Unauthorized', { status: 401 })
		}

		const suggestions = await generateQuestionSuggestions({ messages, language })

		if (!suggestions || suggestions.length !== 4) {
			return new Response('Unauthorized', { status: 401 })
		}

		return Response.json(suggestions)
	} catch (error) {
		return new Response('An error occurred while processing your request', {
			status: 500,
		})
	}
}
