import { cookies } from 'next/headers'

import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models'
import CreateNewChat from '@/components/create-new-chat'
import { ChatHeader } from '@/components/chat-header'
import { auth } from '@/app/(auth)/auth'
import config from '@/features/config'

export default async function Page() {
	const session = await auth()

	const cookieStore = await cookies()
	const modelIdFromCookie = cookieStore.get('chat-model')

	return (
		<div className="flex h-dvh min-w-0 flex-col space-y-6 bg-background">
			<ChatHeader
				user={session?.user}
				header={'Start a Conversation'}
				chatId={''}
				selectedModelId={modelIdFromCookie?.value ?? DEFAULT_CHAT_MODEL}
				selectedVisibilityType={config.insightChat.allowPrivate ? 'private' : 'public'}
				isReadonly={false}
			/>

			<main className="h-full overflow-hidden">
				<CreateNewChat selectedChatModel={modelIdFromCookie?.value ?? DEFAULT_CHAT_MODEL} />
			</main>
		</div>
	)
}
