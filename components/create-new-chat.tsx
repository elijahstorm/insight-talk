import { MultiTypeSelector } from '@/components/multi-type-selector'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import config from '@/features/config'
import { useLanguage } from '@/hooks/use-language'
import { chatLogsType } from '@/components/insight-message'
import { dictionary } from '@/lib/language/dictionary'

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
	const searchParams = useSearchParams()
	const filesBatch = searchParams.get('u')
	const [filepaths, setFilepaths] = useState<Array<string>>([])
	const hasFetchedFilepaths = useRef(false)

	const userName = '스톰' // todo

	useEffect(() => {
		if (filesBatch && !hasFetchedFilepaths.current) {
			hasFetchedFilepaths.current = true
			;(async () => {
				try {
					const response = await fetch(`/api/files/batch?uuid=${filesBatch}`)
					if (response.ok) {
						const data = await response.json()
						setFilepaths(data.filepaths)
					} else {
						toast.error(dictionary.messages.analysis.newChat.uploadFailed[currentLanguage.code])
						if (config.errorLog) {
							console.error('Failed to fetch filepaths')
						}
					}
				} catch (error) {
					toast.error(dictionary.messages.analysis.newChat.uploadFailed[currentLanguage.code])
					if (config.errorLog) {
						console.error('An error occurred while fetching filepaths', error)
					}
				}
			})()
		}
	}, [filesBatch, currentLanguage])

	const deleteFiles = useCallback(async () => {
		if (!filesBatch) return

		try {
			const response = await fetch(`/api/files/batch?uuid=${filesBatch}`, {
				method: 'DELETE',
			})

			if (!response.ok) {
				throw new Error('Failed to delete files batch')
			}
		} catch (error) {
			if (config.errorLog) {
				console.error('Error deleting files batch:', error)
			}
		}
	}, [filesBatch])

	const makeNewChat = useCallback(async () => {
		setShowLoader && setShowLoader(true)

		try {
			const textLogs = await Promise.all(
				filepaths.map(async (filepath) => {
					try {
						const response = await fetch(filepath)
						if (!response.ok) {
							throw new Error(`Failed to fetch file at ${filepath}`)
						}
						return await response.text()
					} catch (error) {
						toast.error(`Error fetching file: ${filepath}`)
						if (config.errorLog) {
							console.error('Error fetching file contents:', error)
						}
						return '(error: file upload failed)'
					}
				})
			)

			deleteFiles()

			const response = await fetch('/api/insight', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					selectedChatModel,
					language: currentLanguage.name,
					userName,
					messages: [
						{
							role: 'user',
							createdAt: new Date(),
							parts: [
								{
									type: chatLogsType,
									logs: textLogs.join(`
---
`),
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
			toast.error(dictionary.messages.analysis.newChat.toasts.error[currentLanguage.code])
			if (config.errorLog) {
				console.error('Error creating chat:', error)
			}
		}
	}, [filepaths, setShowLoader])

	return (
		<>
			{filepaths.length > 0 && (
				<div className="space-y-2 px-4">
					<p className="font-light">
						{dictionary.messages.analysis.newChat.uploadedFileHeader[currentLanguage.code]}
					</p>
					<ul className="list-disc pl-5">
						{filepaths.map((filepath, index) => (
							<li key={index} className="text-xs opacity-40">
								{filepath.substring(filepath.indexOf('/temp/') + '/temp/'.length)}
							</li>
						))}
					</ul>
				</div>
			)}

			<div className="flex h-full flex-col gap-4 overflow-hidden px-4">
				<div className="flex-1 overflow-auto">
					<div className="flex max-w-xl flex-col gap-8 rounded-xl pb-2 text-left font-light leading-relaxed">
						Who are you in this Conversation?
					</div>
					<div className="flex flex-col gap-6">me, not me</div>

					<MultiTypeSelector
						prompt={dictionary.messages.analysis.newChat.partnerTypeQuestion[currentLanguage.code]}
						types={dictionary.relationshipTypes[currentLanguage.code]}
						selectedValues={selectedValues}
						onSelectionChange={setSelectedValues}
						selectOne={true}
					/>
				</div>
				<Button className="mb-6 w-full py-6 hover:bg-accent focus:bg-accent" onClick={makeNewChat}>
					{dictionary.messages.analysis.newChat.start[currentLanguage.code]}
				</Button>
			</div>
		</>
	)
}
