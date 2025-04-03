import type { Message } from 'ai'
import { useSWRConfig } from 'swr'
import { useCopyToClipboard } from 'usehooks-ts'

import type { Vote } from '@/lib/db/schema'

import { CopyIcon, ThumbDownIcon, ThumbUpIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { memo } from 'react'
import equal from 'fast-deep-equal'
import { toast } from 'sonner'
import config from '@/features/config'
import { useLanguage } from '@/hooks/use-language'
import { dictionary } from '@/lib/language/dictionary'

export function PureMessageActions({
	chatId,
	message,
	vote,
	isLoading,
	legacy = false,
}: {
	chatId: string
	message: Message
	vote: Vote | undefined
	isLoading: boolean
	legacy?: boolean
}) {
	const { mutate } = useSWRConfig()
	const [_, copyToClipboard] = useCopyToClipboard()
	const { currentLanguage } = useLanguage()

	if (isLoading) return null
	if (message.role === 'user') return null

	const shouldShowLegacyStyle = () => legacy || config.vote.legacyStyle

	return (
		<TooltipProvider delayDuration={0}>
			<div
				className={`pt-4 ${config.vote.legacyStyle ? 'flex-row' : 'flex-col'} flex items-start gap-2`}
			>
				{!shouldShowLegacyStyle() && (
					<p className="text-sm font-medium text-slate-600">
						{dictionary.messages.actions.question[currentLanguage.code]}
					</p>
				)}
				{shouldShowLegacyStyle() && (
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
										toast.error(dictionary.messages.actions.toasts.copy.error[currentLanguage.code])
										return
									}

									await copyToClipboard(textFromParts)
									toast.success(
										dictionary.messages.actions.toasts.copy.success[currentLanguage.code]
									)
								}}
							>
								<CopyIcon />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							{dictionary.messages.actions.copy[currentLanguage.code]}
						</TooltipContent>
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
									loading: dictionary.messages.actions.toasts.upvote.loading[currentLanguage.code],
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

										return dictionary.messages.actions.toasts.upvote.success[currentLanguage.code]
									},
									error: dictionary.messages.actions.toasts.upvote.error[currentLanguage.code],
								})
							}}
						>
							{shouldShowLegacyStyle() ? (
								<ThumbUpIcon />
							) : (
								<div className="flex gap-2 px-1 py-2">
									<span className="font-light">
										{dictionary.messages.actions.yes[currentLanguage.code]}
									</span>
									<ThumbUpIcon />
								</div>
							)}
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						{dictionary.messages.actions.toolTipYes[currentLanguage.code]}
					</TooltipContent>
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
									loading: dictionary.messages.actions.toasts.upvote.loading[currentLanguage.code],
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

										return dictionary.messages.actions.toasts.upvote.success[currentLanguage.code]
									},
									error: dictionary.messages.actions.toasts.upvote.error[currentLanguage.code],
								})
							}}
						>
							{shouldShowLegacyStyle() ? (
								<ThumbDownIcon />
							) : (
								<div className="flex gap-2 px-1 py-2">
									<span className="font-light">
										{dictionary.messages.actions.no[currentLanguage.code]}
									</span>
									<ThumbDownIcon />
								</div>
							)}
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						{dictionary.messages.actions.toolTipNo[currentLanguage.code]}
					</TooltipContent>
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
