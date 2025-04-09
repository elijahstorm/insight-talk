'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ChatRequestOptions, CreateMessage, Message } from 'ai'
import { memo } from 'react'

interface SuggestedActionsProps {
	chatId: string
	suggestedActions?: Array<{
		title: string
		label: string
		action: string
	}>
	append: (
		message: Message | CreateMessage,
		chatRequestOptions?: ChatRequestOptions
	) => Promise<string | null | undefined>
}

const defaultSuggestedActions = [
	{
		title: 'Analyze my tone',
		label: 'in a recent conversation',
		action: 'Can you analyze the tone of this conversation?',
	},
	{
		title: 'Detect toxic language',
		label: 'in a workplace message',
		action: 'Can you detect toxic language in this workplace message?',
	},
	{
		title: 'Identify conflict triggers',
		label: 'in my communication',
		action: 'What are the conflict triggers in this conversation?',
	},
	{
		title: 'Suggest empathetic responses',
		label: 'to improve my communication',
		action: 'Can you suggest empathetic responses for this situation?',
	},
]

function PureSuggestedActions({
	chatId,
	suggestedActions = defaultSuggestedActions,
	append,
}: SuggestedActionsProps) {
	return (
		<div data-testid="suggested-actions" className="grid w-full gap-2 sm:grid-cols-2">
			{suggestedActions.map((suggestedAction, index) => (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ delay: 0.05 * index }}
					key={`suggested-action-${suggestedAction.title}-${index}`}
					className={index > 1 ? 'hidden sm:block' : 'block'}
				>
					<Button
						variant="ghost"
						onClick={async () => {
							window.history.replaceState({}, '', `/chat/${chatId}`)

							append({
								role: 'user',
								content: suggestedAction.action,
							})
						}}
						className="h-auto w-full flex-1 items-start justify-start gap-1 rounded-xl border px-4 py-3.5 text-left text-sm sm:flex-col"
					>
						<span className="font-medium">{suggestedAction.title}</span>
						<span className="text-muted-foreground">{suggestedAction.label}</span>
					</Button>
				</motion.div>
			))}
		</div>
	)
}

export const SuggestedActions = memo(PureSuggestedActions, () => true)
