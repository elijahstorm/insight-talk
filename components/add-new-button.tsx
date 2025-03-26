'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function HeadsUpButton({
	action,
	icon,
	description,
	hidden = false,
}: {
	action: () => void
	icon: string
	description: string
	hidden?: boolean
}) {
	return (
		<div
			className={`flex items-center justify-end gap-6 transition-opacity ${hidden ? 'opacity-0' : 'pointer-events-auto'}`}
		>
			<p className="pointer-events-none text-sm text-slate-600">{description}</p>

			<button
				className="h-14 w-14 rounded-full bg-primary-500 p-4 text-white shadow-lg ring-offset-1 transition-all hover:bg-primary hover:outline-none hover:ring-2 hover:ring-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
				onClick={action}
			>
				{icon}
			</button>
		</div>
	)
}

export default function AddNewButton() {
	const [menuClosed, setMenuClosed] = useState(true)
	const router = useRouter()

	const openMenu = () => {
		setMenuClosed(false)
	}

	const closeMenu = () => {
		setMenuClosed(true)
	}

	const startConvo = () => {
		router.push('/chat/new')
	}

	const attachFile = () => {}

	const attachImage = () => {}

	return (
		<div className="select-none">
			<button
				className={`fixed inset-0 cursor-default bg-white/30 backdrop-blur-sm transition-opacity ${menuClosed ? 'pointer-events-none opacity-0' : ''}`}
				onClick={closeMenu}
			></button>

			<div className="fixed bottom-6 right-6">
				<HeadsUpButton action={openMenu} description="" icon="+" />
			</div>

			<div className="pointer-events-none fixed bottom-6 right-6 flex flex-col-reverse gap-8">
				<HeadsUpButton
					action={startConvo}
					description="New Converstation"
					icon="chat"
					hidden={menuClosed}
				/>
				<HeadsUpButton
					action={attachFile}
					description="Attach a File"
					icon="📎"
					hidden={menuClosed}
				/>
				<HeadsUpButton
					action={attachImage}
					description="Attach an Image"
					icon="🖼️"
					hidden={menuClosed}
				/>
			</div>
		</div>
	)
}
