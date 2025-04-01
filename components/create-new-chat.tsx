import { MultiTypeSelector } from './multi-type-selector'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import config from '@/features/config'

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

export default function CreateNewChat({
	selectedChatModel,
	setShowLoader,
}: {
	selectedChatModel: string
	setShowLoader?: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const [selectedValues, setSelectedValues] = useState<string[]>([])
	const router = useRouter()

	const makeNewChat = async () => {
		setShowLoader && setShowLoader(true)

		try {
			const response = await fetch('/api/insight', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					selectedChatModel,
					messages: [], // todo
					// message.role === 'user'
					type: selectedValues,
					visibility: config.insightChat.allowPrivate ? 'private' : 'public',
				}),
			})

			if (!response.ok) {
				throw new Error('Failed to create chat')
			}

			const { chatId } = await response.json()

			router.push(`/chat/${chatId}`)
			router.refresh()
		} catch (error) {
			toast.error('Failed to create your chat. Try again later')
			if (config.errorLog) {
				console.error('Error creating chat:', error)
			}
		} finally {
			setShowLoader && setShowLoader(false)
		}
	}

	return (
		<div className="flex h-full flex-col gap-4 overflow-hidden px-4">
			<div className="flex-1 overflow-auto">
				<MultiTypeSelector
					types={typesList}
					selectedValues={selectedValues}
					onSelectionChange={setSelectedValues}
					selectOne={true}
				/>
			</div>
			<Button className="w-full py-6 hover:bg-accent focus:bg-accent" onClick={makeNewChat}>
				Check Talk Insight
			</Button>
		</div>
	)
}
