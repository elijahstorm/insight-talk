import { auth } from '@/app/(auth)/auth'
import { getUserLanguage, updateUserLanguage } from '@/lib/db/queries'

export async function GET() {
	const session = await auth()

	if (!session || !session.user || !session.user.id) {
		return new Response('Unauthorized', { status: 401 })
	}

	const language = await getUserLanguage({ userId: session.user.id })

	if (!language) {
		return new Response('Language not found', { status: 404 })
	}

	return Response.json({ language }, { status: 200 })
}

export async function PATCH(request: Request) {
	const { language }: { language: string } = await request.json()

	if (!language) {
		return new Response('Language is required', { status: 400 })
	}

	const session = await auth()

	if (!session || !session.user || !session.user.id) {
		return new Response('Unauthorized', { status: 401 })
	}

	await updateUserLanguage({
		userId: session.user.id,
		language,
	})

	return new Response('User language updated', { status: 200 })
}
