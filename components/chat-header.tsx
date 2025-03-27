'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useWindowSize } from 'usehooks-ts'

import { ModelSelector } from '@/components/model-selector'
import { SidebarToggle } from '@/components/sidebar-toggle'
import { Button } from '@/components/ui/button'
import { PlusIcon } from './icons'
import { useSidebar } from './ui/sidebar'
import { memo } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { VisibilityType, VisibilitySelector } from './visibility-selector'
import config from '@/features/config'
import { BackButton } from './back-button'

function PureChatHeader({
	header,
	chatId,
	selectedModelId,
	selectedVisibilityType,
	isReadonly,
}: {
	header: string
	chatId: string
	selectedModelId: string
	selectedVisibilityType: VisibilityType
	isReadonly: boolean
}) {
	const router = useRouter()
	const { open } = useSidebar()
	const { width: windowWidth } = useWindowSize()
	const pathname = usePathname()

	return (
		<header className="sticky top-0 flex items-center gap-2 bg-background px-2 py-1.5 md:px-2">
			{config.insightChat.hideSidebar ? <BackButton /> : <SidebarToggle />}

			{(!open || windowWidth < 768) && !pathname.includes('/chat/new') && (
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="outline"
							className="order-2 ml-auto px-2 md:order-1 md:ml-0 md:h-fit md:px-2"
							onClick={() => {
								router.push('/')
								router.refresh()
							}}
						>
							<PlusIcon />
							<span className="md:sr-only">New Chat</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent>New Chat</TooltipContent>
				</Tooltip>
			)}

			{config.insightChat.allowChangeModel && !isReadonly && (
				<ModelSelector selectedModelId={selectedModelId} className="order-1 md:order-2" />
			)}

			{!isReadonly && (
				<VisibilitySelector
					chatId={chatId}
					selectedVisibilityType={selectedVisibilityType}
					className="order-1 md:order-3"
				/>
			)}

			<h1 className="order-1 mx-auto text-lg font-semibold md:order-3">{header}</h1>

			<Button
				className="order-4 hidden h-fit bg-zinc-900 px-2 py-1.5 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 md:ml-auto md:flex md:h-[34px]"
				asChild
			>
				<Link href="https://insight-talk.vercel.app/" target="_noblank">
					[User Icon]
				</Link>
			</Button>
		</header>
	)
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
	return prevProps.selectedModelId === nextProps.selectedModelId
})
