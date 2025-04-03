'use client'

import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import { PaperclipIcon, PlusIcon, ImageIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { dictionary } from '@/lib/language/dictionary'
import { useLanguage } from '@/hooks/use-language'
import config from '@/features/config'

function HeadsUpButton({
	action,
	icon,
	description,
	hidden = false,
}: {
	action: () => void
	icon: ({ size }: { size?: number }) => React.JSX.Element
	description: string
	hidden?: boolean
}) {
	return (
		<div
			className={`flex items-center justify-end gap-6 transition-opacity ${hidden ? 'opacity-0' : 'pointer-events-auto'}`}
		>
			<p className="pointer-events-none text-sm text-slate-600">{description}</p>

			<Button
				className="flex size-14 items-center justify-center rounded-full bg-primary-500 p-4 text-primary-foreground shadow-lg ring-offset-1 transition-all hover:bg-primary hover:outline-none hover:ring-2 hover:ring-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
				onClick={action}
			>
				{icon({ size: 20 })}
			</Button>
		</div>
	)
}

export default function AddNewButton() {
	const { currentLanguage } = useLanguage()
	const [uploadQueue, setUploadQueue] = useState<Array<string>>([])
	const [menuClosed, setMenuClosed] = useState(true)
	const router = useRouter()
	const fileInputRef = useRef<HTMLInputElement | null>(null)

	const openMenu = () => {
		setMenuClosed(false)
	}

	const closeMenu = () => {
		setMenuClosed(true)
	}

	const startConvo = () => {
		router.push('/chat/legacy')
	}

	const attachFile = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click()
		}
	}

	const attachImage = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click()
		}
	}

	const uploadFile = async (file: File) => {
		const formData = new FormData()
		formData.append('file', file)

		try {
			const response = await fetch('/api/files/upload', {
				method: 'POST',
				body: formData,
			})

			if (response.ok) {
				const data = await response.json()
				const { url, pathname, contentType } = data

				return {
					url,
					name: pathname,
					contentType: contentType,
				}
			}

			await response.json()
		} catch (error) {
			toast.error(dictionary.messages.chat.uploadFailed[currentLanguage.code])
		}
	}

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || [])

		setUploadQueue(files.map((file) => file.name))

		try {
			const uploadPromises = files.map((file) => uploadFile(file))
			const uploadedAttachments = await Promise.all(uploadPromises)
			const successfullyUploadedAttachments = uploadedAttachments.filter(
				(attachment) => attachment !== undefined
			)

			const response = await fetch('/api/files/batch', {
				method: 'POST',
				body: JSON.stringify({
					files: successfullyUploadedAttachments.map((attachment) => attachment.url),
				}),
			})

			if (!response.ok) {
				throw new Error('Could not store files batch')
			}

			const { uuid } = await response.json()
			router.push(`/chat/new?u=${uuid}`)
		} catch (error) {
			if (config.errorLog) {
				console.error('Error uploading files!', error)
			}
		} finally {
			setUploadQueue([])
		}
	}

	return (
		<div className="select-none">
			<input
				type="file"
				ref={fileInputRef}
				className="hidden"
				multiple
				onChange={handleFileChange}
			/>

			<button
				className={`fixed inset-0 cursor-default bg-background/30 backdrop-blur-sm transition-opacity ${menuClosed ? 'pointer-events-none opacity-0' : ''}`}
				onClick={closeMenu}
			></button>

			<div className="fixed bottom-6 right-6">
				<HeadsUpButton action={openMenu} description="" icon={PlusIcon} />
			</div>

			<div className="pointer-events-none fixed bottom-6 right-6 flex flex-col-reverse gap-8">
				<HeadsUpButton
					action={startConvo}
					description={
						dictionary.messages.analysis.newChat.buttons.newConversation[currentLanguage.code]
					}
					icon={PlusIcon}
					hidden={menuClosed}
				/>
				<HeadsUpButton
					action={attachFile}
					description={
						dictionary.messages.analysis.newChat.buttons.attachAFile[currentLanguage.code]
					}
					icon={PaperclipIcon}
					hidden={menuClosed}
				/>
				<HeadsUpButton
					action={attachImage}
					description={
						dictionary.messages.analysis.newChat.buttons.attachAnImage[currentLanguage.code]
					}
					icon={ImageIcon}
					hidden={menuClosed}
				/>
			</div>
		</div>
	)
}
