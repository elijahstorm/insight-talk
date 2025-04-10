'use client'

import React, { useEffect, useState } from 'react'
import { dictionary } from '@/lib/language/dictionary'
import { useLanguage } from '@/hooks/use-language'
import Image from 'next/image'

export default function FullPageLoader({ progress }: { progress: number }) {
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
			<Image
				src="/static/logo.svg"
				alt="Logo"
				width={'96'}
				height={'96'}
				className="select-none pb-4"
			/>

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
