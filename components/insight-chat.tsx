'use client'

import type { Attachment, UIMessage } from 'ai'
import { useChat } from '@ai-sdk/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { ChatHeader } from '@/components/chat-header'
import type { Vote } from '@/lib/db/schema'
import { fetcher, generateUUID } from '@/lib/utils'
import { Artifact } from './artifact'
import { Messages } from './messages'
import { VisibilityType } from './visibility-selector'
import { useArtifactSelector } from '@/hooks/use-artifact'
import { toast } from 'sonner'
import Image from 'next/image'
import CreateNewChat from './create-new-chat'
import { InsightMessageType, insightTypes } from './insight-message'

const FullPageLoader = () => {
	const [progress, setProgress] = useState(0)
	const [isActive, setIsActive] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setProgress(100)
			setIsActive(true)
		}, 0)

		return () => clearTimeout(timer)
	}, [])

	return (
		<div
			className={`fade-in ${isActive ? 'fade-in-active' : ''} flex size-full flex-col items-center justify-center gap-4 bg-primary-foreground`}
		>
			<Image src="/static/logo.svg" alt="Logo" width={'96'} height={'96'} className="pb-4" />

			<h1 className="text-3xl">Hold on!</h1>

			<p className="font-semibold">We&rsquo;re making sense of your chats...</p>

			<div className="h-2 w-64 overflow-hidden bg-accent">
				<div
					className="h-full bg-primary"
					style={{ width: `${progress}%`, transition: 'width 3s cubic-bezier(.08, .28, .31, .99)' }}
				></div>
			</div>

			{/* for pushing the content slightly up */}
			<div className="h-24"></div>
		</div>
	)
}

export function InsightChat({
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
	const searchParams = useSearchParams()
	const fileName = searchParams.get('file')

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

	const [showLoader, setShowLoader] = useState<boolean>(false)
	const [attachments, setAttachments] = useState<Array<Attachment>>([])
	const isArtifactVisible = useArtifactSelector((state) => state.isVisible)

	useEffect(() => {
		const updatedMessages = messages.map((message) => {
			if (
				message.parts?.some((part) =>
					insightTypes.includes(
						(part as UIMessage['parts'][number] | InsightMessageType['parts'][number]).type
					)
				)
			) {
				return { ...message, insight: true }
			}
			return message
		})
		setMessages(updatedMessages)
	}, [messages, setMessages])

	return (
		<>
			{showLoader ? (
				<FullPageLoader />
			) : (
				<div className="flex h-dvh min-w-0 flex-col space-y-6 bg-background">
					<ChatHeader
						header={
							messages.length ? 'Report' : fileName ? 'Upload a File' : 'Start a Conversation'
						}
						chatId={id}
						selectedModelId={selectedChatModel}
						selectedVisibilityType={selectedVisibilityType}
						isReadonly={isReadonly}
					/>

					{fileName && (
						<div className="space-y-2 px-4">
							<p className="font-light">Upload Your Converstation</p>
							<div className="pointer-events-none line-clamp-1 select-none rounded-lg border border-slate-200 px-2 py-3 font-thin text-slate-400">
								{fileName}
							</div>
						</div>
					)}

					{messages.length === 0 ? (
						<CreateNewChat setShowLoader={setShowLoader} />
					) : (
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
					)}
				</div>
			)}

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
