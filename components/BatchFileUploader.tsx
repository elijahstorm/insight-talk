'use client'

import React, { ChangeEvent, ReactNode, useCallback, useState } from 'react'
import { toast } from 'sonner'
import { dictionary } from '@/lib/language/dictionary'
import { useLanguage } from '@/hooks/use-language'
import config from '@/features/config'

export default function BatchFileUploader({
	fileInputRef,
	handleFinish,
	children = () => null,
}: {
	fileInputRef: React.MutableRefObject<HTMLInputElement | null>
	handleFinish: (uuid: string) => void
	children?: ({
		uploadProgress,
		uploadQueue,
	}: {
		uploadQueue: Array<string | null>
		uploadProgress: number
	}) => ReactNode
}) {
	const { currentLanguage } = useLanguage()
	const [uploadQueue, setUploadQueue] = useState<Array<string>>([])
	const [uploadProgress, setUploadProgress] = useState(0)

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

	const handleFileChange = useCallback(
		async (event: ChangeEvent<HTMLInputElement>) => {
			const files = Array.from(event.target.files || [])

			setUploadQueue(files.map((file) => file.name))

			try {
				let totalUploaded = 0
				const uploadPromises = files.map(async (file) => {
					const finishedFile = await uploadFile(file)
					totalUploaded++
					setUploadProgress((totalUploaded / files.length) * 100)
					return finishedFile
				})
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
				await new Promise((resolve) => setTimeout(resolve, 1000))
				handleFinish(uuid)
			} catch (error) {
				if (config.errorLog) {
					console.error('Error uploading files!', error)
				}
			} finally {
				setUploadQueue([])
				setUploadProgress(0)
			}
		},
		[handleFinish, setUploadQueue, setUploadProgress]
	)

	return (
		<>
			<input
				type="file"
				ref={fileInputRef}
				className="hidden"
				multiple
				onChange={handleFileChange}
				accept={
					config.insightChat.allowImages
						? '.txt,.csv,.log,.json,.xml,.png,.jpg,.jpeg,.webp'
						: '.txt,.csv,.log,.json,.xml'
				}
			/>

			{children({ uploadQueue, uploadProgress })}
		</>
	)
}
