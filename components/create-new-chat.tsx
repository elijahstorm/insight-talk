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
import { createWorker } from 'tesseract.js'
import { dictionary } from '@/lib/language/dictionary'
import { seperateFiles, warnLogsFromScreenshot } from '@/lib/ai/system-prompts'
import BatchFileUploader from '@/components/BatchFileUploader'
import { PaperclipIcon } from '@/components/icons'
import { cn } from '@/lib/utils'

export default function CreateNewChat({ selectedChatModel }: { selectedChatModel: string }) {
	const [promptState, setPromptState] = useState<'upload' | 'who-are-you' | 'loading' | 'error'>(
		'upload'
	)
	const [selectedValues, setSelectedValues] = useState<string[]>([])
	const { currentLanguage } = useLanguage()
	const router = useRouter()
	const searchParams = useSearchParams()
	const [filesBatch, setFilesBatch] = useState(searchParams.get('u'))
	const [filepaths, setFilepaths] = useState<Array<string>>([])
	const [parsed, setParsed] = useState<{ attachments: string[]; textLogs: string[] } | null>(null)
	const hasFetchedFilepaths = useRef(false)
	const fileInputRef = useRef<HTMLInputElement | null>(null)
	const [userName, setUserName] = useState<string | null>()
	const [chatMemberNames, setChatMemberNames] = useState([])

	useEffect(() => {
		;(async () => {
			if (filesBatch && !hasFetchedFilepaths.current) {
				hasFetchedFilepaths.current = true

				try {
					const response = await fetch(`/api/files/batch?uuid=${filesBatch}`)
					if (response.ok) {
						const data = await response.json()
						setFilepaths(data.filepaths)
					} else {
						throw new Error('Failed to fetch filepaths')
					}
				} catch (error) {
					if (config.errorLog) {
						toast.error(dictionary.messages.analysis.newChat.uploadFailed[currentLanguage.code])
						console.error('An error occurred while fetching filepaths', error)
					}
					setFilesBatch(null)
					hasFetchedFilepaths.current = false
				}
			}
		})()
	}, [filesBatch, currentLanguage])

	const parseFiles = useCallback(async () => {
		if (parsed) return parsed

		const imageFilepaths = filepaths.filter((filepath) => /\.(jpg|jpeg|png)$/i.test(filepath))
		const textFilepaths = filepaths.filter((filepath) => !/\.(jpg|jpeg|png)$/i.test(filepath))

		const filterNull = (array: Array<string | null>) =>
			array.filter((value) => value) as Array<string>

		const attachments = filterNull(
			await Promise.all(
				imageFilepaths.map(async (filepath) => {
					if (!filepath) return null
					const worker = await createWorker('eng')
					const ret = await worker.recognize(filepath)
					await worker.terminate()
					return ret.data.text
				})
			)
		).map(warnLogsFromScreenshot)

		const textLogs = filterNull(
			await Promise.all(
				textFilepaths.map(async (filepath) => {
					try {
						const response = await fetch(filepath)
						if (!response.ok) throw new Error()
						return await response.text()
					} catch (error) {
						if (config.errorLog) {
							toast.error(`Error processing file: ${filepath}`)
							console.error(error)
						}
						return null
					}
				})
			)
		)

		const result = { attachments, textLogs }
		setParsed(result)
		return result
	}, [filepaths, parsed])

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
		} finally {
			setFilepaths([])
			setFilesBatch(null)
			setParsed(null)
		}
	}, [filesBatch, setFilepaths, setFilesBatch, setParsed])

	const makeNewChat = useCallback(async () => {
		if (!filepaths || filepaths.length === 0) {
			setPromptState('upload')
			return
		}

		setPromptState('loading')

		try {
			const { attachments, textLogs } = await parseFiles()

			const response = await fetch('/api/insight', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					selectedChatModel,
					language: currentLanguage.name,
					userName,
					chatMemberNames: chatMemberNames && chatMemberNames.length > 1 ? chatMemberNames : null,
					messages: [
						{
							role: 'user',
							experimental_attachments: [], // attachments.map((attachment) => ({ url: attachment })),
							parts: [
								{
									type: chatLogsType,
									logs: [...textLogs, ...attachments].join(seperateFiles),
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
			if (config.errorLog) {
				toast.error(dictionary.messages.analysis.newChat.toasts.error[currentLanguage.code])
				console.error('Error creating chat:', error)
			}
			setPromptState('error')
		} finally {
			deleteFiles()
		}
	}, [
		deleteFiles,
		parseFiles,
		router,
		userName,
		chatMemberNames,
		selectedChatModel,
		currentLanguage.name,
		currentLanguage.code,
		filepaths,
		selectedValues,
		setPromptState,
	])

	const askWhoAreYou = useCallback(async () => {
		if (!filepaths || filepaths.length === 0) {
			setPromptState('upload')
			return
		}

		setPromptState('loading')

		try {
			const { attachments, textLogs } = await parseFiles()

			const response = await fetch('/api/list-names', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					messages: [...textLogs, ...attachments].join(seperateFiles),
				}),
			})

			if (!response.ok) {
				throw new Error('Failed to get names list from chat')
			}

			const { names, impossible } = await response.json()

			if (impossible) {
				makeNewChat()
				return
			}

			if (!names || !names.length) {
				throw new Error('no names list found')
			}

			setChatMemberNames(names)
			setPromptState('who-are-you')
		} catch (error) {
			if (config.errorLog) {
				toast.error(dictionary.messages.analysis.newChat.toasts.error[currentLanguage.code])
				console.error('Error getting chat members names:', error)
			}
			setPromptState('error')
			deleteFiles()
		}
	}, [filepaths, currentLanguage.code, deleteFiles, parseFiles, setPromptState, makeNewChat])

	const finishUploadingBatch = useCallback(
		(uuid: string) => {
			setFilesBatch(uuid)
		},
		[setFilesBatch]
	)

	const setMyself = useCallback(
		(me: string | null) => () => {
			if (userName === me) {
				setUserName(null)
			} else {
				setUserName(me)
			}
		},
		[userName, setUserName]
	)

	const attachFile = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click()
		}
	}

	return promptState === 'error' ? (
		<FullPageError />
	) : promptState === 'who-are-you' ? (
		<motion.div
			className="mx-auto flex size-full max-w-3xl flex-col gap-4 overflow-hidden px-4"
			key="overview"
			initial={{ opacity: 0, scale: 0.98 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.98 }}
			transition={{ delay: 0.5 }}
		>
			<div className="mx-auto flex size-full flex-1 flex-col gap-4 overflow-auto pb-2">
				{chatMemberNames.length === 1 ? (
					<div className="flex flex-1 flex-col items-center justify-center gap-8 rounded-xl text-center font-light leading-relaxed">
						<h1 className="text-2xl font-semibold">
							{dictionary.messages.analysis.newChat.areYouThisPerson[currentLanguage.code](
								chatMemberNames[0]
							)}
						</h1>
						<div className="flex w-full flex-col gap-4">
							<Button
								variant="outline"
								onClick={setMyself(chatMemberNames[0])}
								className={cn({
									'bg-accent text-accent-foreground hover:bg-secondary':
										chatMemberNames[0] === userName,
								})}
							>
								{dictionary.messages.analysis.newChat.yes[currentLanguage.code]}
							</Button>
							<Button
								variant="outline"
								onClick={setMyself(`not ${chatMemberNames[0]}`)}
								className={cn({
									'bg-accent text-accent-foreground hover:bg-secondary':
										`not ${chatMemberNames[0]}` === userName,
								})}
							>
								{dictionary.messages.analysis.newChat.no[currentLanguage.code]}
							</Button>
							<Button
								variant="outline"
								onClick={setMyself(null)}
								className={cn({
									'bg-accent text-accent-foreground hover:bg-secondary': userName === null,
								})}
							>
								{dictionary.messages.analysis.newChat.preferNotToAnswer[currentLanguage.code]}
							</Button>
						</div>
					</div>
				) : (
					<>
						<div className="flex flex-1 flex-col items-center justify-center gap-8 rounded-xl text-center font-light leading-relaxed">
							<h1 className="text-2xl font-semibold">
								{dictionary.messages.analysis.newChat.pickYourself[currentLanguage.code]}
							</h1>
							<p className="text-center">
								{dictionary.messages.analysis.newChat.pickYourselfInfo[currentLanguage.code]}
							</p>
						</div>
						<div className="flex w-full flex-col gap-2">
							{chatMemberNames.map((member) => (
								<Button
									key={member}
									variant="outline"
									onClick={setMyself(member)}
									className={cn({
										'bg-accent text-accent-foreground hover:bg-secondary': member === userName,
									})}
								>
									{member}
								</Button>
							))}
							<p className="pt-2 text-center text-xs opacity-40">
								{dictionary.messages.analysis.newChat.nameSelectionOptional[currentLanguage.code]}
							</p>
						</div>
					</>
				)}
			</div>
			<Button className="mb-6 w-full py-6 hover:bg-accent focus:bg-accent" onClick={makeNewChat}>
				{dictionary.messages.analysis.newChat.start[currentLanguage.code]}
			</Button>
		</motion.div>
	) : promptState === 'loading' ? (
		<FullPageLoader />
	) : promptState === 'upload' ? (
		<motion.div
			className="flex h-full max-w-3xl flex-col gap-4 overflow-hidden"
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
					<div className="relative w-full cursor-not-allowed select-none overflow-hidden bg-primary text-center">
						<p className="relative py-2 text-primary-foreground">
							{dictionary.messages.analysis.newChat.loading[currentLanguage.code]}
						</p>
					</div>
				</div>
			) : (
				<BatchFileUploader fileInputRef={fileInputRef} handleFinish={finishUploadingBatch}>
					{({ uploadQueue, uploadProgress }) =>
						uploadProgress === 100 || uploadQueue.length > 0 ? (
							<div className="pointer-events-none select-none px-4">
								<div className="relative w-full overflow-hidden bg-accent text-center">
									<div
										className="absolute inset-y-0 left-0 bg-primary"
										style={{
											width: `${uploadProgress}%`,
											transition: 'width 1s ease-out',
										}}
									></div>
									<p className="relative py-2 text-primary-foreground">
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
									<span>
										{dictionary.messages.analysis.newChat.buttons.attachAFile[currentLanguage.code]}
									</span>
								</Button>
							</div>
						)
					}
				</BatchFileUploader>
			)}

			<div className="flex h-full flex-col gap-4 overflow-hidden px-4">
				<p className="pb-4 text-xs opacity-40">
					{dictionary.messages.analysis.newChat.filesNotStored[currentLanguage.code]}
				</p>

				<div className="flex-1 overflow-auto">
					<MultiTypeSelector
						prompt={dictionary.messages.analysis.newChat.partnerTypeQuestion[currentLanguage.code]}
						types={dictionary.relationshipTypes[currentLanguage.code]}
						selectedValues={selectedValues}
						onSelectionChange={setSelectedValues}
						selectOne={true}
					/>
				</div>
				<Button
					className="mb-6 w-full py-6 hover:bg-accent focus:bg-accent"
					onClick={askWhoAreYou}
					disabled={!filepaths || filepaths.length === 0}
				>
					{dictionary.messages.analysis.newChat.start[currentLanguage.code]}
				</Button>
			</div>
		</motion.div>
	) : (
		<></>
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
			<Image
				src="/static/animated-logo.svg"
				alt="Logo"
				width={'96'}
				height={'96'}
				className="select-none pb-4"
			/>

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

const FullPageError = () => {
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
			<Image
				src="/static/animated-logo-dead.svg"
				alt="Logo"
				width={'96'}
				height={'96'}
				className="select-none pb-4"
			/>

			<h1 className="text-3xl">
				{dictionary.messages.analysis.newChat.error[currentLanguage.code]}
			</h1>

			<p className="w-full max-w-[430px] px-8 text-center font-semibold">
				{dictionary.messages.analysis.newChat.errorInfo[currentLanguage.code]}
			</p>

			{/* for pushing the content slightly up */}
			<div className="h-32"></div>
		</div>
	)
}
