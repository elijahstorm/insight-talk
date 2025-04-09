import { UIMessage } from 'ai'
import { PreviewMessage, ThinkingMessage } from '@/components/message'
import { useScrollToBottom } from '@/components/use-scroll-to-bottom'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Vote } from '@/lib/db/schema'
import equal from 'fast-deep-equal'
import { UseChatHelpers } from '@ai-sdk/react'
import { InsightMessageType, insightTypes } from '@/components/insight-message'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { dictionary } from '@/lib/language/dictionary'
import { useLanguage } from '@/hooks/use-language'
import { useRouter } from 'next/navigation'

interface MessagesProps {
	chatId: string
	status: UseChatHelpers['status']
	votes: Array<Vote> | undefined
	messages: Array<UIMessage | InsightMessageType>
	setMessages: UseChatHelpers['setMessages']
	reload: UseChatHelpers['reload']
	isReadonly: boolean
	isArtifactVisible: boolean
	children?: React.ReactNode
}

const isInsightMessage = (message?: UIMessage | InsightMessageType) => {
	return message?.parts?.some((part) =>
		insightTypes.includes(
			(part as UIMessage['parts'][number] | InsightMessageType['parts'][number]).type
		)
	)
}

function PureMessages({
	chatId,
	status,
	votes,
	messages,
	setMessages,
	reload,
	isReadonly,
	children,
}: MessagesProps) {
	const [__, messagesStartRef] = useScrollToBottom<HTMLDivElement>()
	const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>()
	const [currentMessage, setCurrentMessage] = useState<number>(0)
	const [visibleMessageParts, setVisibleMessageParts] = useState<number>(0)
	const { currentLanguage } = useLanguage()
	const router = useRouter()
	const prevLength = useRef(messages.length)

	useEffect(() => {
		if (messages.length !== prevLength.current) {
			let startOfLegacyMessages = messages.length - 1

			while (startOfLegacyMessages >= 0) {
				const current = messages[startOfLegacyMessages]
				if (isInsightMessage(current)) {
					startOfLegacyMessages++
					break
				}
				startOfLegacyMessages--
			}

			setCurrentMessage(startOfLegacyMessages)
			prevLength.current = messages.length
		}
	}, [messages, currentMessage])

	useEffect(() => {
		if (visibleMessageParts === 0) {
			if (messagesStartRef.current) {
				messagesStartRef.current.scrollIntoView({ behavior: 'smooth' })
			}
		} else {
			if (messagesEndRef.current) {
				messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
			}
		}
	}, [visibleMessageParts, currentMessage, messagesEndRef, messagesStartRef])

	const showNextPart = () => {
		if (visibleMessageParts < (messages[currentMessage].parts?.length || 0) - 1) {
			setVisibleMessageParts((prevIndex) => prevIndex + 1)
		}
	}

	const showNextMessage = (skipIndex: number) => () => {
		setCurrentMessage((prevIndex) => prevIndex + skipIndex)
		setVisibleMessageParts(0)
	}

	const goBackToHistory = useCallback(() => {
		router.push('/')
	}, [])

	const goToDeeperInsight = useCallback(() => {
		setVisibleMessageParts(0)
		setCurrentMessage(messages.length)
	}, [messages, setCurrentMessage])

	const showableMessages = (() => {
		const current = messages[currentMessage]
		if (isInsightMessage(current)) {
			return [current]
		}

		const legacyMessages = []
		for (let i = currentMessage; i < messages.length; i++) {
			const message = messages[i]
			if (isInsightMessage(message)) {
				break
			}
			legacyMessages.push(message)
		}
		return legacyMessages
	})()

	return currentMessage >= messages.length ? (
		<div className="flex h-full flex-col gap-4 overflow-hidden px-4 pb-6">
			<div className="flex min-w-0 flex-1 flex-col gap-6 overflow-y-scroll">
				<p className="px-16 pt-16 text-slate-600 dark:text-slate-400">
					{dictionary.messages.analysis.followUp[currentLanguage.code]}
				</p>
			</div>
			{children}
		</div>
	) : (
		<div className="flex h-full flex-col gap-4 overflow-hidden pb-6">
			<div
				ref={messagesContainerRef}
				className="flex min-w-0 flex-1 flex-col gap-6 overflow-y-scroll"
			>
				<div ref={messagesStartRef} className="h-0 shrink-0" />

				{showableMessages.map((message, index) => (
					<PreviewMessage
						key={`${chatId}-${index}`}
						chatId={chatId}
						message={message}
						visibleParts={visibleMessageParts}
						isLoading={status === 'streaming'}
						vote={votes ? votes.find((vote) => vote.messageId === message.id) : undefined}
						setMessages={setMessages}
						reload={reload}
						isReadonly={isReadonly}
					/>
				))}

				{status === 'submitted' &&
					messages.length > 0 &&
					messages[messages.length - 1].role === 'user' && <ThinkingMessage />}

				{visibleMessageParts !== 0 && <div ref={messagesEndRef} className="h-0 shrink-0" />}
			</div>

			{messages[currentMessage].insight ? (
				visibleMessageParts === (messages[currentMessage].parts?.length || 0) - 1 ? (
					<AnimatePresence key="next-message">
						<motion.div
							className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4"
							initial={{ y: 5, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
						>
							{currentMessage + showableMessages.length < messages.length ? (
								showNextMessage && (
									<Button
										className="py-6"
										variant={'outline'}
										onClick={showNextMessage(showableMessages.length)}
									>
										{messages[currentMessage + showableMessages.length].parts[0]
											? dictionary.messages.navigation.showNextButton[
													messages[currentMessage + showableMessages.length].parts[0].type
												][currentLanguage.code]
											: dictionary.messages.navigation.showNextButton.text[currentLanguage.code]}
									</Button>
								)
							) : (
								<Button className="py-6" variant={'outline'} onClick={goBackToHistory}>
									{dictionary.messages.navigation.backToHistory[currentLanguage.code]}
								</Button>
							)}
							<Button
								className="py-6 hover:bg-primary focus:bg-primary"
								onClick={goToDeeperInsight}
							>
								{dictionary.messages.navigation.getDeeperInsight[currentLanguage.code]}
							</Button>
						</motion.div>
					</AnimatePresence>
				) : (
					<AnimatePresence key="next-page">
						<motion.div
							className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4"
							initial={{ y: 5, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
						>
							<Button className="py-6 hover:bg-primary focus:bg-primary" onClick={showNextPart}>
								{dictionary.messages.navigation.readMore[currentLanguage.code]}
							</Button>
						</motion.div>
					</AnimatePresence>
				)
			) : (
				<div className="flex flex-col gap-4 px-4">{children}</div>
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
