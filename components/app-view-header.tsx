'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useWindowSize } from 'usehooks-ts'

import { SidebarToggle } from '@/components/sidebar-toggle'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@/components/icons'
import { useSidebar } from '@/components/ui/sidebar'
import { memo } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import config from '@/features/config'
import { HomeButton } from '@/components/home-button'
import LightDarkThemeToggle from '@/components/light-dark-theme-toggle'
import Image from 'next/image'
import { User } from 'next-auth'
import { dictionary } from '@/lib/language/dictionary'
import { useLanguage } from '@/hooks/use-language'

function PureChatHeader({ header = '', user }: { header?: string; user?: User }) {
	const router = useRouter()
	const { open } = useSidebar()
	const { width: windowWidth } = useWindowSize()
	const { currentLanguage } = useLanguage()

	return (
		<header className="sticky top-0 flex items-center gap-2 bg-background px-2 py-1.5 md:px-2">
			<HomeButton />

			{(!open || windowWidth < 768) && !config.insightChat.hideNewChatHeader && (
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
							<span className="md:sr-only">
								{dictionary.tooltips.newChat[currentLanguage.code]}
							</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent>{dictionary.tooltips.newChat[currentLanguage.code]}</TooltipContent>
				</Tooltip>
			)}

			<h1 className="order-1 mx-auto text-lg font-semibold md:order-2">{header}</h1>

			{config.insightChat.showUserIcon && user && (
				<Button className="order-4 h-fit select-none" variant="outline" asChild>
					<Link href="/my-page" target="_noblank">
						<Image
							src={`https://avatar.vercel.sh/${user.email ?? ''}`}
							alt={user.email ?? 'User Avatar'}
							width={24}
							height={24}
							className="rounded-full"
						/>
						<span className="hidden max-w-[100px] truncate md:inline">{user?.email}</span>
					</Link>
				</Button>
			)}

			{config.header.showDarkModeToggle && (
				<div className="order-2">
					<LightDarkThemeToggle />
				</div>
			)}

			{windowWidth < 768 && (
				<div className="order-2">
					<SidebarToggle />
				</div>
			)}
		</header>
	)
}

export const AppViewHeader = memo(PureChatHeader, (prevProps, nextProps) => {
	return prevProps.header === nextProps.header
})
