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
			className={`flex gap-6 items-center justify-end transition-opacity ${hidden ? 'opacity-0' : 'pointer-events-auto'}`}
		>
			<p className="text-sm text-slate-600 pointer-events-none">{description}</p>

			<button
				className="w-14 h-14 bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary-300 hover:outline-none ring-offset-1 hover:ring-2 hover:ring-primary-400 transition-all"
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
				className={`fixed cursor-default inset-0 transition-opacity bg-white/30 backdrop-blur-sm ${menuClosed ? 'opacity-0 pointer-events-none' : ''}`}
				onClick={closeMenu}
			></button>

			<div className="bottom-6 right-6 fixed">
				<HeadsUpButton action={openMenu} description="" icon="+" />
			</div>

			<div className="bottom-6 right-6 fixed flex gap-8 flex-col-reverse pointer-events-none">
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
