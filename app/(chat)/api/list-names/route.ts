import { auth } from '@/app/(auth)/auth'
import { generateNamesListFromMessages } from '@/app/(chat)/actions'

export const maxDuration = 60

export async function POST(request: Request) {
	try {
		const {
			messages,
		}: {
			messages?: string | null
		} = await request.json()

		if (!messages || !messages.length) {
			return new Response('No message details', { status: 404 })
		}

		const session = await auth()

		if (!session || !session.user || !session.user.id) {
			return new Response('Unauthorized', { status: 401 })
		}

		const { names } = await generateNamesListFromMessages({
			messages,
		})

		if (!names || names.length === 0) {
			throw new Error('No names found')
		}

		return Response.json({ names }, { status: 200 })
	} catch (error) {
		console.error('error info - ', error)
		return new Response('An error occurred while processing your request', {
			status: 404,
		})
	}
}
