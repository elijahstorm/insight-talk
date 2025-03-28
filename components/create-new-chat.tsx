import { MultiTypeSelector } from './multi-type-selector'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

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
	setShowLoader,
}: {
	setShowLoader?: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const [selectedValues, setSelectedValues] = useState<string[]>([])
	const router = useRouter()

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
			<Button
				className="w-full py-6 hover:bg-accent focus:bg-accent"
				onClick={() => {
					setShowLoader && setShowLoader(true)
					// todo
					// Push `selectedValues` to the database here
					// on response and new chatId set, then:
					// if config.insightChat.allowPrivate ? set public : set private
					setTimeout(() => {
						const chatId = 'fe210abc-6c08-46bf-8f75-1fd78ad7f2bb'
						router.push(`/chat/${chatId}`)
						router.refresh()
					}, 3000)
				}}
			>
				Check Talk Insight
			</Button>
		</div>
	)
}
