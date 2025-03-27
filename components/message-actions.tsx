import type { Message } from 'ai'
import { useSWRConfig } from 'swr'
import { useCopyToClipboard } from 'usehooks-ts'

import type { Vote } from '@/lib/db/schema'

import { CopyIcon, ThumbDownIcon, ThumbUpIcon } from './icons'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { memo } from 'react'
import equal from 'fast-deep-equal'
import { toast } from 'sonner'
import config from '@/features/config'

export function PureMessageActions({
	chatId,
	message,
	vote,
	isLoading,
}: {
	chatId: string
	message: Message
	vote: Vote | undefined
	isLoading: boolean
}) {
	const { mutate } = useSWRConfig()
	const [_, copyToClipboard] = useCopyToClipboard()

	if (isLoading) return null
	if (message.role === 'user') return null

	return (
		<TooltipProvider delayDuration={0}>
			<div
				className={`pt-4 ${config.vote.legacyStyle ? 'flex-row' : 'flex-col'} flex items-start gap-2`}
			>
				{!config.vote.legacyStyle && (
					<p className="text-sm font-medium text-slate-600">Was this analysis helpful?</p>
				)}
				{config.vote.legacyStyle && (
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								className="h-fit px-2 py-1 text-muted-foreground"
								variant="outline"
								onClick={async () => {
									const textFromParts = message.parts
										?.filter((part) => part.type === 'text')
										.map((part) => part.text)
										.join('\n')
										.trim()

									if (!textFromParts) {
										toast.error("There's no text to copy!")
										return
									}

									await copyToClipboard(textFromParts)
									toast.success('Copied to clipboard!')
								}}
							>
								<CopyIcon />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Copy</TooltipContent>
					</Tooltip>
				)}

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							data-testid="message-upvote"
							className="!pointer-events-auto h-fit px-2 py-1 text-muted-foreground disabled:bg-accent disabled:text-accent-foreground disabled:opacity-100"
							disabled={vote?.isUpvoted}
							variant="outline"
							onClick={async () => {
								const upvote = fetch('/api/vote', {
									method: 'PATCH',
									body: JSON.stringify({
										chatId,
										messageId: message.id,
										type: 'up',
									}),
								})

								toast.promise(upvote, {
									loading: 'Upvoting Response...',
									success: () => {
										mutate<Array<Vote>>(
											`/api/vote?chatId=${chatId}`,
											(currentVotes) => {
												if (!currentVotes) return []

												const votesWithoutCurrent = currentVotes.filter(
													(vote) => vote.messageId !== message.id
												)

												return [
													...votesWithoutCurrent,
													{
														chatId,
														messageId: message.id,
														isUpvoted: true,
													},
												]
											},
											{ revalidate: false }
										)

										return 'Upvoted Response!'
									},
									error: 'Failed to upvote response.',
								})
							}}
						>
							{config.vote.legacyStyle ? (
								<ThumbUpIcon />
							) : (
								<div className="flex gap-2 px-1 py-2">
									<span className="font-light">It was accurate and useful!</span>
									<ThumbUpIcon />
								</div>
							)}
						</Button>
					</TooltipTrigger>
					<TooltipContent>Upvote Response</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							data-testid="message-downvote"
							className="!pointer-events-auto h-fit px-2 py-1 text-muted-foreground disabled:bg-accent disabled:text-accent-foreground disabled:opacity-100"
							variant="outline"
							disabled={vote && !vote.isUpvoted}
							onClick={async () => {
								const downvote = fetch('/api/vote', {
									method: 'PATCH',
									body: JSON.stringify({
										chatId,
										messageId: message.id,
										type: 'down',
									}),
								})

								toast.promise(downvote, {
									loading: 'Downvoting Response...',
									success: () => {
										mutate<Array<Vote>>(
											`/api/vote?chatId=${chatId}`,
											(currentVotes) => {
												if (!currentVotes) return []

												const votesWithoutCurrent = currentVotes.filter(
													(vote) => vote.messageId !== message.id
												)

												return [
													...votesWithoutCurrent,
													{
														chatId,
														messageId: message.id,
														isUpvoted: false,
													},
												]
											},
											{ revalidate: false }
										)

										return 'Downvoted Response!'
									},
									error: 'Failed to downvote response.',
								})
							}}
						>
							{config.vote.legacyStyle ? (
								<ThumbDownIcon />
							) : (
								<div className="flex gap-2 px-1 py-2">
									<span className="font-light">
										It wasn&rsquo;t helpful or didn&rsquo;t make sense.
									</span>
									<ThumbDownIcon />
								</div>
							)}
						</Button>
					</TooltipTrigger>
					<TooltipContent>Downvote Response</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
	)
}

export const MessageActions = memo(PureMessageActions, (prevProps, nextProps) => {
	if (!equal(prevProps.vote, nextProps.vote)) return false
	if (prevProps.isLoading !== nextProps.isLoading) return false

	return true
})
