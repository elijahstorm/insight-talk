import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import { ChatIcon, PlusIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { dictionary } from '@/lib/language/dictionary'
import { useLanguage } from '@/hooks/use-language'
import BatchFileUploader from '@/components/BatchFileUploader'
import FullPageLoader from '@/components/full-page-loader'
import config from '@/features/config'

export default function HistoryAddNewButton() {
	const { currentLanguage } = useLanguage()
	const router = useRouter()
	const fileInputRef = useRef<HTMLInputElement | null>(null)

	const attachFile = () => {
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
				uploadProgress === 100 || uploadQueue.length > 0 ? (
					<FullPageLoader progress={uploadProgress} />
				) : (
					<Button
						className="flex h-auto flex-col items-center justify-center gap-2 shadow-lg shadow-slate-200 hover:bg-primary focus:bg-primary dark:shadow-slate-900 [&_svg]:size-8"
						onClick={attachFile}
					>
						{config.search.addNewChatIcon ? <ChatIcon /> : <PlusIcon />}
						{dictionary.messages.analysis.newChat.buttons.newConversation[currentLanguage.code]}
					</Button>
				)
			}
		</BatchFileUploader>
	)
}
