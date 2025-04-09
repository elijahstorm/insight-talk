'use client'

import { MultiTypeSelector } from '@/components/multi-type-selector'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import config from '@/features/config'
import Image from 'next/image'
import { useLanguage } from '@/hooks/use-language'
import { chatLogsType } from '@/components/insight-message'
import { dictionary } from '@/lib/language/dictionary'
import { seperateFiles } from '@/lib/ai/system-prompts'
import BatchFileUploader from '@/components/BatchFileUploader'
import { PaperclipIcon } from '@/components/icons'

export default function CreateNewChat({ selectedChatModel }: { selectedChatModel: string }) {
	const [showLoader, setShowLoader] = useState<boolean>(false)
	const [selectedValues, setSelectedValues] = useState<string[]>([])
	const { currentLanguage } = useLanguage()
	const router = useRouter()
	const searchParams = useSearchParams()
	const [filesBatch, setFilesBatch] = useState(searchParams.get('u'))
	const [filepaths, setFilepaths] = useState<Array<string>>([])
	const hasFetchedFilepaths = useRef(false)
	const fileInputRef = useRef<HTMLInputElement | null>(null)

	const userName = '' // todo

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
			const imageFilepaths = filepaths.filter((filepath) =>
				/\.(jpg|jpeg|png|gif|bmp|tiff|webp)$/i.test(filepath)
			)
			const textFilepaths = filepaths.filter(
				(filepath) => !/\.(jpg|jpeg|png|gif|bmp|tiff|webp)$/i.test(filepath)
			)

			const attachments = await Promise.all(
				imageFilepaths.map(async (filepath) => {
					return filepath
				})
			)

			const textLogs = await Promise.all(
				textFilepaths.map(async (filepath) => {
					try {
						const response = await fetch(filepath)
						if (!response.ok) {
							throw new Error(`Failed to fetch file at ${filepath}`)
						}
						return await response.text()
					} catch (error) {
						toast.error(`Error processing file: ${filepath}`)
						if (config.errorLog) {
							console.error('Error processing file contents:', error)
						}
						return '(error: file processing failed)'
					}
				})
			)

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
							experimental_attachments: attachments.map((attachment) => ({ url: attachment })),
							parts:
								textLogs.length > 0
									? [
											{
												type: chatLogsType,
												logs: textLogs.join(seperateFiles),
											},
										]
									: [],
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
		} finally {
			deleteFiles()
		}
	}, [
		deleteFiles,
		router,
		selectedChatModel,
		currentLanguage.name,
		currentLanguage.code,
		filepaths,
		selectedValues,
		setShowLoader,
	])

	const finishUploadingBatch = useCallback(
		(uuid: string) => {
			setFilesBatch(uuid)
		},
		[setFilesBatch]
	)

	const attachFile = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click()
		}
	}

	return showLoader ? (
		<FullPageLoader />
	) : (
		<motion.div
			className="flex h-full flex-col gap-4 overflow-hidden"
			key="overview"
			initial={{ opacity: 0, scale: 0.98 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.98 }}
			transition={{ delay: 0.5 }}
		>
			{filepaths.length > 0 ? (
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
			) : filesBatch ? (
				<div className="pointer-events-none select-none px-4">
					<div className="relative w-full overflow-hidden bg-primary text-center">
						<p className="relative py-2">
							{dictionary.messages.analysis.newChat.uploading[currentLanguage.code]}
						</p>
					</div>
				</div>
			) : (
				<BatchFileUploader fileInputRef={fileInputRef} handleFinish={finishUploadingBatch}>
					{({ uploadQueue, uploadProgress }) =>
						uploadQueue.length > 0 ? (
							<div className="pointer-events-none select-none px-4">
								<div className="relative w-full overflow-hidden bg-accent text-center">
									<div
										className="absolute inset-y-0 left-0 bg-primary"
										style={{
											width: `${uploadProgress}%`,
											transition: 'width 1s ease-out',
										}}
									></div>
									<p className="relative py-2">
										{dictionary.messages.analysis.newChat.uploading[currentLanguage.code]}
									</p>
								</div>
							</div>
						) : (
							<div className="px-4">
								<Button
									className="w-full py-6 hover:bg-accent focus:bg-accent"
									onClick={attachFile}
								>
									<PaperclipIcon size={20} />
									<span className="hidden sm:block">
										{dictionary.messages.analysis.newChat.buttons.attachAFile[currentLanguage.code]}
									</span>
								</Button>
							</div>
						)
					}
				</BatchFileUploader>
			)}

			<div className="flex h-full flex-col gap-4 overflow-hidden px-4">
				<div className="flex-1 overflow-auto">
					<div className="hidden">
						<div className="flex max-w-xl flex-col gap-8 rounded-xl pb-2 text-left font-light leading-relaxed">
							{/* todo */}
							Who are you in this Conversation?
						</div>
						<div className="flex flex-col gap-6">me, not me</div>
					</div>

					<div className="mx-auto max-w-3xl">
						<MultiTypeSelector
							prompt={
								dictionary.messages.analysis.newChat.partnerTypeQuestion[currentLanguage.code]
							}
							types={dictionary.relationshipTypes[currentLanguage.code]}
							selectedValues={selectedValues}
							onSelectionChange={setSelectedValues}
							selectOne={true}
						/>
					</div>
				</div>
				<Button className="mb-6 w-full py-6 hover:bg-accent focus:bg-accent" onClick={makeNewChat}>
					{dictionary.messages.analysis.newChat.start[currentLanguage.code]}
				</Button>
			</div>
		</motion.div>
	)
}

const FullPageLoader = () => {
	const { currentLanguage } = useLanguage()
	const [progress, setProgress] = useState(0)
	const [isActive, setIsActive] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setProgress(100)
			setIsActive(true)
		}, 0)

		return () => clearTimeout(timer)
	}, [])

	return (
		<div
			className={`fade-in ${isActive ? 'opacity-100' : 'opacity-0'} flex size-full flex-col items-center justify-center gap-4`}
		>
			<Image src="/static/logo.svg" alt="Logo" width={'96'} height={'96'} className="pb-4" />

			<h1 className="text-3xl">
				{dictionary.messages.analysis.newChat.holdOn[currentLanguage.code]}
			</h1>

			<p className="font-semibold">
				{dictionary.messages.analysis.newChat.makingSenseOfChats[currentLanguage.code]}
			</p>

			<div className="h-2 w-64 overflow-hidden bg-accent">
				<div
					className="h-full bg-primary"
					style={{
						width: `${progress}%`,
						transition: 'width 30s cubic-bezier(.05,.24,.34,1)',
					}}
				></div>
			</div>

			{/* for pushing the content slightly up */}
			<div className="h-24"></div>
		</div>
	)
}
