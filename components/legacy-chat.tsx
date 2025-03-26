'use client'

import type { Attachment, UIMessage } from 'ai'
import { useChat } from '@ai-sdk/react'
import { useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { ChatHeader } from '@/components/chat-header'
import type { Vote } from '@/lib/db/schema'
import { fetcher, generateUUID } from '@/lib/utils'
import { Artifact } from './artifact'
import { MultimodalInput } from './multimodal-input'
import { Messages } from './messages'
import { VisibilityType } from './visibility-selector'
import { useArtifactSelector } from '@/hooks/use-artifact'
import { toast } from 'sonner'

export function LegacyChat({
	id,
	initialMessages,
	selectedChatModel,
	selectedVisibilityType,
	isReadonly,
}: {
	id: string
	initialMessages: Array<UIMessage>
	selectedChatModel: string
	selectedVisibilityType: VisibilityType
	isReadonly: boolean
}) {
	const { mutate } = useSWRConfig()

	const { messages, setMessages, handleSubmit, input, setInput, append, status, stop, reload } =
		useChat({
			id,
			body: { id, selectedChatModel: selectedChatModel },
			initialMessages,
			experimental_throttle: 100,
			sendExtraMessageFields: true,
			generateId: generateUUID,
			onFinish: () => {
				mutate('/api/history')
			},
			onError: () => {
				toast.error('An error occured, please try again!')
			},
		})

	const { data: votes } = useSWR<Array<Vote>>(
		messages.length >= 2 ? `/api/vote?chatId=${id}` : null,
		fetcher
	)

	const [attachments, setAttachments] = useState<Array<Attachment>>([])
	const isArtifactVisible = useArtifactSelector((state) => state.isVisible)

	return (
		<>
			<div className="flex h-dvh min-w-0 flex-col bg-background">
				<ChatHeader
					chatId={id}
					selectedModelId={selectedChatModel}
					selectedVisibilityType={selectedVisibilityType}
					isReadonly={isReadonly}
				/>

				<Messages
					chatId={id}
					status={status}
					votes={votes}
					messages={messages}
					setMessages={setMessages}
					reload={reload}
					isReadonly={isReadonly}
					isArtifactVisible={isArtifactVisible}
				/>

				<form className="mx-auto flex w-full gap-2 bg-background px-4 pb-4 md:max-w-3xl md:pb-6">
					{!isReadonly && (
						<MultimodalInput
							chatId={id}
							input={input}
							setInput={setInput}
							handleSubmit={handleSubmit}
							status={status}
							stop={stop}
							attachments={attachments}
							setAttachments={setAttachments}
							messages={messages}
							setMessages={setMessages}
							append={append}
						/>
					)}
				</form>
			</div>

			<Artifact
				chatId={id}
				input={input}
				setInput={setInput}
				handleSubmit={handleSubmit}
				status={status}
				stop={stop}
				attachments={attachments}
				setAttachments={setAttachments}
				append={append}
				messages={messages}
				setMessages={setMessages}
				reload={reload}
				votes={votes}
				isReadonly={isReadonly}
			/>
		</>
	)
}
