import { cookies } from 'next/headers'

import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models'
import { generateUUID } from '@/lib/utils'
import { DataStreamHandler } from '@/components/data-stream-handler'
import { LegacyChat } from '@/components/legacy-chat'

export default async function Page() {
	const id = generateUUID()

	const cookieStore = await cookies()
	const modelIdFromCookie = cookieStore.get('chat-model')

	return (
		<>
			<LegacyChat
				key={id}
				id={id}
				initialMessages={[]}
				selectedChatModel={modelIdFromCookie?.value ?? DEFAULT_CHAT_MODEL}
				selectedVisibilityType="private"
				isReadonly={false}
			/>
			<DataStreamHandler id={id} />
		</>
	)
}
