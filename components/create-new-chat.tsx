import { MultiTypeSelector } from '@/components/multi-type-selector'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import config from '@/features/config'
import { demoDataDONOTCOMMIT } from '@/lib/ai/system-prompts'
import { useLanguage } from '@/hooks/use-language'
import { chatLogsType } from '@/components/insight-message'
import { relationshipTypes } from '@/lib/ai/relationship-types'

export default function CreateNewChat({
	selectedChatModel,
	setShowLoader,
}: {
	selectedChatModel: string
	setShowLoader?: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const [selectedValues, setSelectedValues] = useState<string[]>([])
	const { currentLanguage } = useLanguage()
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
					language: currentLanguage.name,
					name: '스톰', // todo
					messages: [
						{
							role: 'user',
							createdAt: new Date(),
							parts: [
								{
									type: chatLogsType,
									logs: demoDataDONOTCOMMIT,
								},
							],
						},
					],
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
					types={relationshipTypes}
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
