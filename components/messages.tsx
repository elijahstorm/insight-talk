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
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'

interface MessagesProps {
	chatId: string
	status: UseChatHelpers['status']
	votes: Array<Vote> | undefined
	messages: Array<(UIMessage | InsightMessageType) & { insight?: boolean }>
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
	const searchParams = useSearchParams()
	const [__, messagesStartRef] = useScrollToBottom<HTMLDivElement>()
	const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>()
	const currentPage = searchParams.get('page')
	const [currentMessage, setCurrentMessage] = useState<number>(parseInt(currentPage ?? '0'))
	const [visibleMessageParts, setVisibleMessageParts] = useState<number>(0)
	const { currentLanguage } = useLanguage()
	const router = useRouter()
	const prevLength = useRef(messages.length)
	const [userPaid, setUserPaid] = useState(false)

	useEffect(() => {
		setCurrentMessage(parseInt(currentPage ?? '0'))
		setVisibleMessageParts(0)
	}, [setCurrentMessage, searchParams, currentPage])

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
		if (visibleMessageParts === 0 && messages[currentMessage]?.insight) {
			if (messagesStartRef.current) {
				messagesStartRef.current.scrollIntoView({ behavior: 'smooth' })
			}
		} else {
			if (messagesEndRef.current) {
				messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
			}
		}
	}, [
		status,
		messages,
		messages.length,
		visibleMessageParts,
		currentMessage,
		messagesEndRef,
		messagesStartRef,
	])

	const isThinking = useCallback(
		() =>
			status === 'submitted' &&
			messages.length > 0 &&
			messages[messages.length - 1].role === 'user',
		[status, messages, messages.length]
	)

	const showNextPart = () => {
		if (visibleMessageParts < (messages[currentMessage].parts?.length || 0) - 1) {
			setVisibleMessageParts((prevIndex) => prevIndex + 1)
		}
	}

	const goBackToHistory = useCallback(() => {
		router.push('/')
	}, [router])

	const showNextMessage = useCallback(
		(skipIndex: number) => () => {
			const nextPage = currentMessage + skipIndex
			const currentUrl = new URL(window.location.href)
			currentUrl.searchParams.set('page', nextPage.toString())
			router.push(currentUrl.toString())
		},
		[router, currentMessage]
	)

	const goToDeeperInsight = useCallback(() => {
		const currentUrl = new URL(window.location.href)
		currentUrl.searchParams.set('page', messages.length.toString())
		router.push(currentUrl.toString())
	}, [router, messages])

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

	if (currentMessage >= messages.length && !userPaid) {
		return (
			<motion.div
				className="flex size-full flex-col justify-between pt-48"
				initial={{ y: 5, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
			>
				<div className="relative mx-auto w-full min-w-[300px] space-y-4 px-4 text-center">
					<p className="absolute left-[calc(50%+70px)] top-[calc(50%-232px)] w-44 -translate-x-1/2 -translate-y-1/2 rounded-2xl rounded-bl-none bg-primary px-4 py-2 text-primary-foreground">
						{dictionary.messages.analysis.upsale.lookingForClarity[currentLanguage.code]}
					</p>

					<p className="absolute right-[calc(50%+80px)] top-[calc(50%-190px)] w-48 -translate-y-1/2 translate-x-1/2 rounded-2xl rounded-br-none bg-secondary px-4 py-2 text-left text-secondary-foreground">
						{dictionary.messages.analysis.upsale.wonderedWhy[currentLanguage.code]}
					</p>

					<Image
						src="/static/animated-logo-clouds.svg"
						alt="Logo"
						width={300}
						height={300}
						className="relative mx-auto select-none pb-4"
					/>

					<h1 className="pt-4 text-3xl font-bold">
						{dictionary.messages.analysis.upsale.wantToGoDeeper[currentLanguage.code]}
					</h1>

					<h3 className="mx-auto max-w-[220px] font-normal">
						{dictionary.messages.analysis.upsale.letMeHelp[currentLanguage.code]}
					</h3>
				</div>

				<div className="px-4 pb-6">
					<Button
						className="w-full py-6 shadow-lg shadow-slate-200 hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground dark:shadow-slate-900"
						variant={'default'}
						onClick={() => setUserPaid(true)}
					>
						{dictionary.messages.analysis.upsale.addMoreDetail[currentLanguage.code]}
					</Button>
				</div>
			</motion.div>
		)
	}

	return currentMessage >= messages.length ? (
		<div className="flex h-full flex-col gap-4 overflow-hidden px-4 pb-6">
			<div className="flex min-w-0 flex-1 flex-col gap-6 overflow-y-scroll">
				<p className="mx-auto max-w-3xl px-16 pt-16 text-slate-600 dark:text-slate-400">
					{dictionary.messages.analysis.followUp[currentLanguage.code]}
				</p>
			</div>
			{children}
		</div>
	) : (
		<div className="flex h-full flex-col gap-4 overflow-hidden pb-6">
			<div ref={messagesContainerRef} className="min-w-0 flex-1 overflow-y-auto">
				<div ref={messagesStartRef} className="h-0" />

				<div className="flex min-w-0 flex-1 flex-col gap-6">
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
						>
							{(partIndex) =>
								messages[currentMessage]?.insight && partIndex === visibleMessageParts ? (
									<div ref={messagesEndRef} className="h-0" />
								) : (
									<></>
								)
							}
						</PreviewMessage>
					))}

					{isThinking() && <ThinkingMessage />}
				</div>

				{!messages[currentMessage]?.insight ? <div ref={messagesEndRef} className="h-0" /> : <></>}
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
										className="py-6 shadow-lg shadow-slate-200 dark:shadow-slate-900"
										variant={'outline'}
										onClick={showNextMessage(showableMessages.length)}
									>
										{messages[currentMessage + showableMessages.length].parts[0]
											? dictionary.messages.navigation.showNextButton[
													messages[currentMessage + showableMessages.length].parts[0].type
												][currentLanguage.code]
											: dictionary.messages.navigation.readMore[currentLanguage.code]}
									</Button>
								)
							) : (
								<Button className="py-6" variant={'outline'} onClick={goBackToHistory}>
									{dictionary.messages.navigation.backToHistory[currentLanguage.code]}
								</Button>
							)}
							<Button
								className="py-6 shadow-lg shadow-slate-200 hover:bg-primary focus:bg-primary dark:shadow-slate-900"
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
							<Button
								className="py-6 shadow-lg shadow-slate-200 hover:bg-primary focus:bg-primary dark:shadow-slate-900"
								onClick={showNextPart}
							>
								{messages[currentMessage].parts[visibleMessageParts + 1]
									? dictionary.messages.navigation.showNextButton[
											messages[currentMessage].parts[visibleMessageParts + 1].type
										][currentLanguage.code]
									: dictionary.messages.navigation.readMore[currentLanguage.code]}
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
