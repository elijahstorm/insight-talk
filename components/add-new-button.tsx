'use client'

import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { PaperclipIcon, PlusIcon, ImageIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { dictionary } from '@/lib/language/dictionary'
import { useLanguage } from '@/hooks/use-language'
import config from '@/features/config'
import BatchFileUploader from './BatchFileUploader'
import Image from 'next/image'

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
	const [menuClosed, setMenuClosed] = useState(true)
	const router = useRouter()
	const fileInputRef = useRef<HTMLInputElement | null>(null)

	const openMenu = useCallback(() => {
		setMenuClosed(false)
	}, [setMenuClosed])

	const closeMenu = useCallback(() => {
		setMenuClosed(true)
	}, [setMenuClosed])

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

	const finishUploadingBatch = (uuid: string) => {
		router.push(`/chat/new?u=${uuid}`)
	}

	return (
		<BatchFileUploader fileInputRef={fileInputRef} handleFinish={finishUploadingBatch}>
			{({ uploadQueue, uploadProgress }) =>
				uploadQueue.length > 0 ? (
					<FullPageLoader progress={uploadProgress} />
				) : (
					<div className="select-none">
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
							{config.insightChat.allowImages && (
								<HeadsUpButton
									action={attachImage}
									description={
										dictionary.messages.analysis.newChat.buttons.attachAnImage[currentLanguage.code]
									}
									icon={ImageIcon}
									hidden={menuClosed}
								/>
							)}
						</div>
					</div>
				)
			}
		</BatchFileUploader>
	)
}

const FullPageLoader = ({ progress }: { progress: number }) => {
	const { currentLanguage } = useLanguage()
	const [isActive, setIsActive] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsActive(true)
		}, 0)

		return () => clearTimeout(timer)
	}, [])

	return (
		<div
			className={`absolute inset-0 max-h-screen bg-background fade-in ${isActive ? 'opacity-100' : 'opacity-0'} flex size-full flex-col items-center justify-center gap-4`}
		>
			<Image src="/static/logo.svg" alt="Logo" width={'96'} height={'96'} className="pb-4" />

			<h1 className="text-3xl">
				{dictionary.messages.analysis.newChat.holdOn[currentLanguage.code]}
			</h1>

			<p className="font-semibold">
				{dictionary.messages.analysis.newChat.uploadingFiles[currentLanguage.code]}
			</p>

			<div className="h-2 w-64 overflow-hidden bg-accent">
				<div
					className="h-full bg-primary"
					style={{
						width: `${progress}%`,
						transition: 'width 1s ease-out',
					}}
				></div>
			</div>

			{/* for pushing the content slightly up */}
			<div className="h-24"></div>
		</div>
	)
}
