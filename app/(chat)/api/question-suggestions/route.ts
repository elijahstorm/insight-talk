import {
	UIMessage,
	appendResponseMessages,
	createDataStreamResponse,
	smoothStream,
	streamText,
} from 'ai'
import { auth } from '@/app/(auth)/auth'
import {
	deleteChatById,
	getChatById,
	getLanguageByUser,
	saveChat,
	saveMessages,
} from '@/lib/db/queries'
import {
	generateMockedResponse,
	generateUUID,
	getMostRecentUserMessage,
	getTrailingMessageId,
} from '@/lib/utils'
import { generateTitleFromUserMessage, messagesToPrompt } from '@/app/(chat)/actions'
import { createDocument } from '@/lib/ai/tools/create-document'
import { updateDocument } from '@/lib/ai/tools/update-document'
import { requestSuggestions } from '@/lib/ai/tools/request-suggestions'
import { getWeather } from '@/lib/ai/tools/get-weather'
import { isProductionEnvironment } from '@/lib/constants'
import { myProvider } from '@/lib/ai/providers'
import config from '@/features/config'
import { systemPrompt } from '@/lib/ai/system-prompts'

export const maxDuration = 60

export async function POST(request: Request) {
	try {
		const {
			id,
		}: {
			id: string
		} = await request.json()

		const session = await auth()

		if (!session || !session.user || !session.user.id) {
			return new Response('Unauthorized', { status: 401 })
		}

		getChatById({ id })

		return Response.json([
			{
				title: 'string',
				label: 'string',
				action: 'string',
			},
			{
				title: 'string',
				label: 'string',
				action: 'string',
			},
			{
				title: 'string',
				label: 'string',
				action: 'string',
			},
			{
				title: 'string',
				label: 'string',
				action: 'string',
			},
		])
	} catch (error) {
		return new Response('An error occurred while processing your request!', {
			status: 404,
		})
	}
}

export async function DELETE(request: Request) {
	const { searchParams } = new URL(request.url)
	const id = searchParams.get('id')

	if (!id) {
		return new Response('Not Found', { status: 404 })
	}

	const session = await auth()

	if (!session || !session.user) {
		return new Response('Unauthorized', { status: 401 })
	}

	try {
		const chat = await getChatById({ id })

		if (chat.userId !== session.user.id) {
			return new Response('Unauthorized', { status: 401 })
		}

		await deleteChatById({ id })

		return new Response('Chat deleted', { status: 200 })
	} catch (error) {
		return new Response('An error occurred while processing your request!', {
			status: 500,
		})
	}
}
