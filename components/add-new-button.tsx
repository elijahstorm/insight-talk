'use client'

import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { PaperclipIcon, PlusIcon, ImageIcon } from './icons'
import { Button } from './ui/button'

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

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const formData = new FormData()
			formData.append('file', file)

			router.push(`/chat/new?file=${encodeURIComponent(file.name)}`)
		}
	}

	return (
		<div className="select-none">
			<input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

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
					description="New Converstation"
					icon={PlusIcon}
					hidden={menuClosed}
				/>
				<HeadsUpButton
					action={attachFile}
					description="Attach a File"
					icon={PaperclipIcon}
					hidden={menuClosed}
				/>
				<HeadsUpButton
					action={attachImage}
					description="Attach an Image"
					icon={ImageIcon}
					hidden={menuClosed}
				/>
			</div>
		</div>
	)
}
