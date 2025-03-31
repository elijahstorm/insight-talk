import { cookies } from 'next/headers'

import { InsightChat } from '@/components/insight-chat'
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models'
import { generateUUID } from '@/lib/utils'
import { DataStreamHandler } from '@/components/data-stream-handler'
import { auth } from '@/app/(auth)/auth'

export default async function Page() {
	const id = generateUUID()

	const session = await auth()

	const cookieStore = await cookies()
	const modelIdFromCookie = cookieStore.get('chat-model')

	return (
		<>
			<InsightChat
				key={id}
				id={id}
				user={session?.user}
				initialMessages={[]}
				selectedChatModel={modelIdFromCookie?.value ?? DEFAULT_CHAT_MODEL}
				selectedVisibilityType="private"
				isReadonly={false}
			/>
			<DataStreamHandler id={id} />
		</>
	)
}
