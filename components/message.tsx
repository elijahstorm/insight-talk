'use client'

import type { UIMessage } from 'ai'
import cx from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { memo, useState } from 'react'
import type { Vote } from '@/lib/db/schema'
import { DocumentToolCall, DocumentToolResult } from './document'
import { PencilEditIcon, SparklesIcon } from './icons'
import { Markdown } from './markdown'
import { MessageActions } from './message-actions'
import { PreviewAttachment } from './preview-attachment'
import { Weather } from './weather'
import equal from 'fast-deep-equal'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { MessageEditor } from './message-editor'
import { DocumentPreview } from './document-preview'
import { MessageReasoning } from './message-reasoning'
import { UseChatHelpers } from '@ai-sdk/react'
import InsightMessage, { InsightMessageType, isInsightMessageType } from './insight-message'

type MessageParams = {
	chatId: string
	vote: Vote | undefined
	isLoading: boolean
}

type InsightMessageParams = MessageParams & {
	message: InsightMessageType
}

type LegacyMessageParams = MessageParams & {
	message: UIMessage
	setMessages: UseChatHelpers['setMessages']
	reload: UseChatHelpers['reload']
	isReadonly: boolean
}

const PurePreviewMessage = ({
	chatId,
	message,
	vote,
	isLoading,
	setMessages,
	reload,
	isReadonly,
}: MessageParams & {
	message: UIMessage | InsightMessageType
	setMessages: UseChatHelpers['setMessages']
	reload: UseChatHelpers['reload']
	isReadonly: boolean
}) => {
	return (
		<AnimatePresence>
			<motion.div
				data-testid={`message-${message.role}`}
				className="group/message mx-auto w-full max-w-3xl px-4"
				initial={{ y: 5, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				data-role={message.role}
			>
				{isInsightMessageType(message) ? (
					<InsightChat chatId={chatId} message={message} vote={vote} isLoading={isLoading} />
				) : (
					<LegacyChat
						chatId={chatId}
						message={message}
						vote={vote}
						isLoading={isLoading}
						setMessages={setMessages}
						reload={reload}
						isReadonly={isReadonly}
					/>
				)}
			</motion.div>
		</AnimatePresence>
	)
}

const InsightChat = ({ chatId, message, vote, isLoading }: InsightMessageParams) => {
	return (
		<div className="flex w-full gap-4 group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl">
			<div className="flex w-full flex-col gap-4">
				{message.experimental_attachments && (
					<div data-testid={`message-attachments`} className="flex flex-row justify-end gap-2">
						{message.experimental_attachments.map((attachment) => (
							<PreviewAttachment key={attachment.url} attachment={attachment} />
						))}
					</div>
				)}

				<div className="space-y-8">
					{message.parts?.map((part, index) => (
						<InsightMessage
							key={`insight-message-${chatId}-part-${index}`}
							part={part}
							index={index}
							messageId={message.id}
							isLoading={isLoading}
						/>
					))}
				</div>

				<MessageActions
					key={`action-${message.id}`}
					chatId={chatId}
					message={message}
					vote={vote}
					isLoading={isLoading}
				/>
			</div>
		</div>
	)
}

const LegacyChat = ({
	chatId,
	message,
	vote,
	isLoading,
	setMessages,
	reload,
	isReadonly,
}: LegacyMessageParams) => {
	const [mode, setMode] = useState<'view' | 'edit'>('view')

	return (
		<div
			className={cn(
				'flex w-full gap-4 group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl',
				{
					'w-full': mode === 'edit',
					'group-data-[role=user]/message:w-fit': mode !== 'edit',
				}
			)}
		>
			{message.role === 'assistant' && (
				<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-border">
					<div className="translate-y-px">
						<SparklesIcon size={14} />
					</div>
				</div>
			)}

			<div className="flex w-full flex-col gap-4">
				{message.experimental_attachments && (
					<div data-testid={`message-attachments`} className="flex flex-row justify-end gap-2">
						{message.experimental_attachments.map((attachment) => (
							<PreviewAttachment key={attachment.url} attachment={attachment} />
						))}
					</div>
				)}

				{message.parts?.map((part, index) => {
					const { type } = part
					const key = `message-${message.id}-part-${index}`

					if (type === 'reasoning') {
						return <MessageReasoning key={key} isLoading={isLoading} reasoning={part.reasoning} />
					}

					if (type === 'text') {
						if (mode === 'view') {
							return (
								<div key={key} className="flex flex-row items-start gap-2">
									{message.role === 'user' && !isReadonly && (
										<Tooltip>
											<TooltipTrigger asChild>
												<Button
													data-testid="message-edit-button"
													variant="ghost"
													className="h-fit rounded-full px-2 text-muted-foreground opacity-0 group-hover/message:opacity-100"
													onClick={() => {
														setMode('edit')
													}}
												>
													<PencilEditIcon />
												</Button>
											</TooltipTrigger>
											<TooltipContent>Edit message</TooltipContent>
										</Tooltip>
									)}

									<div
										data-testid="message-content"
										className={cn('flex flex-col gap-4', {
											'rounded-xl bg-primary px-3 py-2 text-primary-foreground':
												message.role === 'user',
										})}
									>
										<Markdown>{part.text}</Markdown>
									</div>
								</div>
							)
						}

						if (mode === 'edit') {
							return (
								<div key={key} className="flex flex-row items-start gap-2">
									<div className="size-8" />

									<MessageEditor
										key={message.id}
										message={message}
										setMode={setMode}
										setMessages={setMessages}
										reload={reload}
									/>
								</div>
							)
						}
					}

					if (type === 'tool-invocation') {
						const { toolInvocation } = part
						const { toolName, toolCallId, state } = toolInvocation

						if (state === 'call') {
							const { args } = toolInvocation

							return (
								<div
									key={toolCallId}
									className={cx({
										skeleton: ['getWeather'].includes(toolName),
									})}
								>
									{toolName === 'getWeather' ? (
										<Weather />
									) : toolName === 'createDocument' ? (
										<DocumentPreview isReadonly={isReadonly} args={args} />
									) : toolName === 'updateDocument' ? (
										<DocumentToolCall type="update" args={args} isReadonly={isReadonly} />
									) : toolName === 'requestSuggestions' ? (
										<DocumentToolCall
											type="request-suggestions"
											args={args}
											isReadonly={isReadonly}
										/>
									) : null}
								</div>
							)
						}

						if (state === 'result') {
							const { result } = toolInvocation

							return (
								<div key={toolCallId}>
									{toolName === 'getWeather' ? (
										<Weather weatherAtLocation={result} />
									) : toolName === 'createDocument' ? (
										<DocumentPreview isReadonly={isReadonly} result={result} />
									) : toolName === 'updateDocument' ? (
										<DocumentToolResult type="update" result={result} isReadonly={isReadonly} />
									) : toolName === 'requestSuggestions' ? (
										<DocumentToolResult
											type="request-suggestions"
											result={result}
											isReadonly={isReadonly}
										/>
									) : (
										<pre>{JSON.stringify(result, null, 2)}</pre>
									)}
								</div>
							)
						}
					}
				})}

				{!isReadonly && (
					<MessageActions
						key={`action-${message.id}`}
						chatId={chatId}
						message={message}
						vote={vote}
						isLoading={isLoading}
					/>
				)}
			</div>
		</div>
	)
}

export const PreviewMessage = memo(PurePreviewMessage, (prevProps, nextProps) => {
	if (prevProps.isLoading !== nextProps.isLoading) return false
	if (prevProps.message.id !== nextProps.message.id) return false
	if (!equal(prevProps.message.parts, nextProps.message.parts)) return false
	if (!equal(prevProps.vote, nextProps.vote)) return false

	return true
})

export const ThinkingMessage = () => {
	const role = 'assistant'

	return (
		<motion.div
			data-testid="message-assistant-loading"
			className="group/message mx-auto w-full max-w-3xl px-4"
			initial={{ y: 5, opacity: 0 }}
			animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
			data-role={role}
		>
			<div
				className={cx(
					'flex w-full gap-4 rounded-xl group-data-[role=user]/message:ml-auto group-data-[role=user]/message:w-fit group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:px-3 group-data-[role=user]/message:py-2',
					{
						'group-data-[role=user]/message:bg-muted': true,
					}
				)}
			>
				<div className="flex size-8 shrink-0 items-center justify-center rounded-full ring-1 ring-border">
					<SparklesIcon size={14} />
				</div>

				<div className="flex w-full flex-col gap-2">
					<div className="flex flex-col gap-4 text-muted-foreground">Hmm...</div>
				</div>
			</div>
		</motion.div>
	)
}
