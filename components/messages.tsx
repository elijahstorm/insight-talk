import { UIMessage } from 'ai'
import { PreviewMessage, ThinkingMessage } from './message'
import { useScrollToBottom } from './use-scroll-to-bottom'
import { MultiTypeSelector } from './multi-type-selector'
import { memo } from 'react'
import { Vote } from '@/lib/db/schema'
import { Button } from '@/components/ui/button'
import equal from 'fast-deep-equal'
import { UseChatHelpers } from '@ai-sdk/react'
import { useRouter } from 'next/navigation'

interface MessagesProps {
	chatId: string
	status: UseChatHelpers['status']
	votes: Array<Vote> | undefined
	messages: Array<UIMessage>
	setMessages: UseChatHelpers['setMessages']
	reload: UseChatHelpers['reload']
	isReadonly: boolean
	isArtifactVisible: boolean
	setShowLoader: React.Dispatch<React.SetStateAction<boolean>>
}

const typesList = [
	{
		title: 'Romantic & Dating',
		types: [
			{
				icon: '💕',
				type: 'Romantic Partner',
			},
			{
				icon: '💞',
				type: 'Potential Partner',
			},
			{
				icon: '💔',
				type: 'Ex-Partner',
			},
		],
	},
	{
		title: 'Friendship & Social',
		types: [
			{
				icon: '👫',
				type: 'Close Friend',
			},
			{
				icon: '🎉',
				type: 'Acquaintance',
			},
		],
	},
	{
		title: 'Family',
		types: [
			{
				icon: '👪',
				type: 'Immediate Family',
			},
			{
				icon: '🏡',
				type: 'Distant Relative',
			},
		],
	},
	{
		title: 'Work & Professional',
		types: [
			{
				icon: '🏡',
				type: 'Coworker',
			},
			{
				icon: '👩‍💼',
				type: 'Manager',
			},
			{
				icon: '🤝',
				type: 'Business Contact',
			},
		],
	},
	{
		title: 'Other',
		types: [
			{
				icon: '❓',
				type: 'No Listed / Prefer Not to Say',
			},
		],
	},
]

function PureMessages({
	chatId,
	status,
	votes,
	messages,
	setMessages,
	reload,
	isReadonly,
	setShowLoader,
}: MessagesProps) {
	const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>()
	const router = useRouter()

	return (
		<div
			ref={messagesContainerRef}
			className="flex min-w-0 flex-1 flex-col gap-6 overflow-y-scroll"
		>
			{messages.length === 0 && (
				<div className="flex h-full flex-col gap-4 overflow-hidden px-4">
					<div className="flex-1 overflow-auto">
						<MultiTypeSelector types={typesList} />
					</div>
					<Button
						className="w-full py-6 hover:bg-accent focus:bg-accent"
						onClick={() => {
							setShowLoader(true)
							// create chat then go to that chat
							// router.push('/')
							// router.refresh()
						}}
					>
						Check Talk Insight
					</Button>
				</div>
			)}

			{messages.map((message, index) => (
				<PreviewMessage
					key={message.id}
					chatId={chatId}
					message={message}
					isLoading={status === 'streaming' && messages.length - 1 === index}
					vote={votes ? votes.find((vote) => vote.messageId === message.id) : undefined}
					setMessages={setMessages}
					reload={reload}
					isReadonly={isReadonly}
				/>
			))}

			{status === 'submitted' &&
				messages.length > 0 &&
				messages[messages.length - 1].role === 'user' && <ThinkingMessage />}

			<div ref={messagesEndRef} className="min-h-[24px] min-w-[24px] shrink-0" />
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
