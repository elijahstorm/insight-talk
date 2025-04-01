import { UIMessage } from 'ai'
import { PreviewMessage, ThinkingMessage } from '@/components/message'
import { useScrollToBottom } from '@/components/use-scroll-to-bottom'
import { memo, useEffect, useState } from 'react'
import { Vote } from '@/lib/db/schema'
import equal from 'fast-deep-equal'
import { UseChatHelpers } from '@ai-sdk/react'
import { InsightMessageType } from '@/components/insight-message'
import { useCopyToClipboard } from 'usehooks-ts'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'

interface MessagesProps {
	chatId: string
	status: UseChatHelpers['status']
	votes: Array<Vote> | undefined
	messages: Array<UIMessage | InsightMessageType>
	setMessages: UseChatHelpers['setMessages']
	reload: UseChatHelpers['reload']
	isReadonly: boolean
	isArtifactVisible: boolean
}

function PureMessages({
	chatId,
	status,
	votes,
	messages,
	setMessages,
	reload,
	isReadonly,
}: MessagesProps) {
	const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>()
	const [currentMessage, setCurrentMessage] = useState<number>(0)
	const [visibleMessageParts, setVisibleMessageParts] = useState<number>(0)
	const [_, copyToClipboard] = useCopyToClipboard()

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [visibleMessageParts, currentMessage, messagesEndRef])

	const showNextPart = () => {
		if (visibleMessageParts < (messages[currentMessage].parts?.length || 0) - 1) {
			setVisibleMessageParts((prevIndex) => prevIndex + 1)
		}
	}

	const showNextMessage = () => {
		setCurrentMessage((prevIndex) => prevIndex + 1)
		setVisibleMessageParts(0)
	}

	const share = async () => {
		const link = `${window.location.origin}${window.location.pathname}`

		if (!link) {
			toast.error('Error trying to share')
			return
		}

		await copyToClipboard(link)
		toast.success('Copied link to clipboard!')
	}

	return (
		<div className="flex h-full flex-col gap-4 overflow-hidden pb-6">
			<div
				ref={messagesContainerRef}
				className="flex min-w-0 flex-1 flex-col gap-6 overflow-y-scroll"
			>
				<PreviewMessage
					chatId={chatId}
					message={messages[currentMessage]}
					visibleParts={visibleMessageParts}
					isLoading={status === 'streaming'}
					vote={
						votes ? votes.find((vote) => vote.messageId === messages[currentMessage].id) : undefined
					}
					setMessages={setMessages}
					reload={reload}
					isReadonly={isReadonly}
				/>

				{status === 'submitted' &&
					messages.length > 0 &&
					messages[messages.length - 1].role === 'user' && <ThinkingMessage />}

				{visibleMessageParts !== 0 && <div ref={messagesEndRef} className="h-0 shrink-0" />}
			</div>

			{visibleMessageParts === (messages[currentMessage].parts?.length || 0) - 1 ? (
				<AnimatePresence key="next-message">
					<motion.div
						className="flex w-full flex-col gap-4 px-4"
						initial={{ y: 5, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
					>
						<Button className="py-6" variant={'outline'} onClick={share}>
							Share
						</Button>
						{showNextMessage && currentMessage < messages.length - 1 && (
							<Button className="py-6 hover:bg-primary focus:bg-primary" onClick={showNextMessage}>
								See the Reply Ideas
							</Button>
						)}
					</motion.div>
				</AnimatePresence>
			) : (
				<AnimatePresence key="next-page">
					<motion.div
						className="flex w-full flex-col gap-4 px-4"
						initial={{ y: 5, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
					>
						<Button className="py-6 hover:bg-primary focus:bg-primary" onClick={showNextPart}>
							Check Talk Insight
						</Button>
					</motion.div>
				</AnimatePresence>
			)}
		</div>
	)
}

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
	if (prevProps.isArtifactVisible && nextProps.isArtifactVisible) return true

	if (prevProps.status !== nextProps.status) return false
	if (prevProps.status && nextProps.status) return false
	if (prevProps.messages.length !== nextProps.messages.length) return false
	if (!equal(prevProps.messages, nextProps.messages)) return false
	if (!equal(prevProps.votes, nextProps.votes)) return false

	return true
})
