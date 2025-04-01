'use client'

import type { User } from 'next-auth'
import { useRouter } from 'next/navigation'

import { PlusIcon } from '@/components/icons'
import { SidebarHistory } from '@/components/sidebar-history'
import { SidebarUserNav } from '@/components/sidebar-user-nav'
import { Button } from '@/components/ui/button'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	useSidebar,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { DropdownContent } from '@/components/DropdownContent'
import { SidebarLanguageSelector } from '@/components/sidebar-language-selector'
import { useWindowSize } from 'usehooks-ts'

export function AppSidebar({ user }: { user: User | undefined }) {
	const router = useRouter()
	const { setOpenMobile } = useSidebar()
	const { width: windowWidth } = useWindowSize()

	return (
		<Sidebar
			side={windowWidth < 768 ? 'right' : 'left'}
			className="group-data-[side=right]:border-l-0"
		>
			<SidebarHeader>
				<SidebarMenu>
					<div className="flex flex-row items-center justify-between">
						<Link
							href="/"
							onClick={() => {
								setOpenMobile(false)
							}}
							className="flex flex-row items-center gap-3"
						>
							<span className="cursor-pointer rounded-md px-2 text-lg font-semibold hover:bg-muted">
								Talk Insight
							</span>
						</Link>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									type="button"
									className="h-fit p-2"
									onClick={() => {
										setOpenMobile(false)
										router.push('/')
										router.refresh()
									}}
								>
									<PlusIcon />
								</Button>
							</TooltipTrigger>
							<TooltipContent align="end">New Chat</TooltipContent>
						</Tooltip>
					</div>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<DropdownContent
					dropdowns={[
						{
							title: 'Language',
							content: <SidebarLanguageSelector user={user} />,
						},
						{
							title: 'Liked',
							content: <SidebarHistory user={user} limitLiked />,
						},
						{
							title: 'History',
							content: <SidebarHistory user={user} />,
						},
					]}
				/>
			</SidebarContent>
			<SidebarFooter>{user && <SidebarUserNav user={user} />}</SidebarFooter>
		</Sidebar>
	)
}
