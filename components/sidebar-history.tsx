'use client'

import { isToday, isYesterday, subMonths, subWeeks } from 'date-fns'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import type { User } from 'next-auth'
import { memo, useEffect, useState } from 'react'
import { toast } from 'sonner'
import useSWR from 'swr'

import {
	CheckCircleFillIcon,
	GlobeIcon,
	LockIcon,
	MoreHorizontalIcon,
	ShareIcon,
	TrashIcon,
} from '@/components/icons'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar'
import type { Chat } from '@/lib/db/schema'
import { fetcher } from '@/lib/utils'
import { useChatVisibility } from '@/hooks/use-chat-visibility'
import { dictionary } from '@/lib/language/dictionary'
import { useLanguage } from '@/hooks/use-language'

type GroupedChats = {
	today: Chat[]
	yesterday: Chat[]
	lastWeek: Chat[]
	lastMonth: Chat[]
	older: Chat[]
}

const PureChatItem = ({
	chat,
	isActive,
	onDelete,
	setOpenMobile,
}: {
	chat: Chat
	isActive: boolean
	onDelete: (chatId: string) => void
	setOpenMobile: (open: boolean) => void
}) => {
	const { currentLanguage } = useLanguage()
	const { visibilityType, setVisibilityType } = useChatVisibility({
		chatId: chat.id,
		initialVisibility: chat.visibility,
	})

	return (
		<SidebarMenuItem>
			<SidebarMenuButton asChild isActive={isActive}>
				<Link href={`/chat/${chat.id}`} onClick={() => setOpenMobile(false)}>
					<span>{chat.title}</span>
				</Link>
			</SidebarMenuButton>

			<DropdownMenu modal={true}>
				<DropdownMenuTrigger asChild>
					<SidebarMenuAction
						className="mr-0.5 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						showOnHover={!isActive}
					>
						<MoreHorizontalIcon />
						<span className="sr-only">{dictionary.sidebar.actions.more[currentLanguage.code]}</span>
					</SidebarMenuAction>
				</DropdownMenuTrigger>

				<DropdownMenuContent side="bottom" align="end">
					<DropdownMenuSub>
						<DropdownMenuSubTrigger className="cursor-pointer">
							<ShareIcon />
							<span>{dictionary.messages.navigation.share[currentLanguage.code]}</span>
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem
									className="cursor-pointer flex-row justify-between"
									onClick={() => {
										setVisibilityType('private')
									}}
								>
									<div className="flex flex-row items-center gap-2">
										<LockIcon size={12} />
										<span>{dictionary.sidebar.actions.private[currentLanguage.code]}</span>
									</div>
									{visibilityType === 'private' ? <CheckCircleFillIcon /> : null}
								</DropdownMenuItem>
								<DropdownMenuItem
									className="cursor-pointer flex-row justify-between"
									onClick={() => {
										setVisibilityType('public')
									}}
								>
									<div className="flex flex-row items-center gap-2">
										<GlobeIcon />
										<span>{dictionary.sidebar.actions.public[currentLanguage.code]}</span>
									</div>
									{visibilityType === 'public' ? <CheckCircleFillIcon /> : null}
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>

					<DropdownMenuItem
						className="cursor-pointer text-destructive focus:bg-destructive/15 focus:text-destructive dark:text-red-500"
						onSelect={() => onDelete(chat.id)}
					>
						<TrashIcon />
						<span>{dictionary.sidebar.actions.delete.delete[currentLanguage.code]}</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</SidebarMenuItem>
	)
}

export const ChatItem = memo(PureChatItem, (prevProps, nextProps) => {
	if (prevProps.isActive !== nextProps.isActive) return false
	return true
})

export function SidebarHistory({
	user,
	limitLiked = false,
}: {
	user: User | undefined
	limitLiked?: boolean
}) {
	const { currentLanguage } = useLanguage()
	const { setOpenMobile } = useSidebar()
	const { id } = useParams()
	const pathname = usePathname()
	const {
		data: history,
		isLoading,
		mutate,
	} = useSWR<Array<Chat>>(user && limitLiked ? '/api/liked-chats' : '/api/history', fetcher, {
		fallbackData: [],
	})

	useEffect(() => {
		mutate()
	}, [pathname, mutate])

	const [deleteId, setDeleteId] = useState<string | null>(null)
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const router = useRouter()
	const handleDelete = async () => {
		const deletePromise = fetch(`/api/chat?id=${deleteId}`, {
			method: 'DELETE',
		})

		toast.promise(deletePromise, {
			loading: dictionary.messages.chat.deletingChat.loading[currentLanguage.code],
			success: () => {
				mutate((history) => {
					if (history) {
						return history.filter((h) => h.id !== id)
					}
				})
				return dictionary.messages.chat.deletingChat.success[currentLanguage.code]
			},
			error: dictionary.messages.chat.deletingChat.failed[currentLanguage.code],
		})

		setShowDeleteDialog(false)

		if (deleteId === id) {
			router.push('/')
		}
	}

	if (!user) {
		return (
			<SidebarGroup>
				<SidebarGroupContent>
					<div className="flex w-full flex-row items-center justify-center gap-2 px-2 text-sm text-zinc-500">
						{dictionary.sidebar.actions.login[currentLanguage.code]}
					</div>
				</SidebarGroupContent>
			</SidebarGroup>
		)
	}

	if (isLoading) {
		return (
			<SidebarGroup>
				<div className="px-2 py-1 text-xs text-sidebar-foreground/50">
					{dictionary.history.today[currentLanguage.code]}
				</div>
				<SidebarGroupContent>
					<div className="flex flex-col">
						{[44, 32, 28, 64, 52].map((item) => (
							<div key={item} className="flex h-8 items-center gap-2 rounded-md px-2">
								<div
									className="h-4 max-w-[--skeleton-width] flex-1 rounded-md bg-sidebar-accent-foreground/10"
									style={
										{
											'--skeleton-width': `${item}%`,
										} as React.CSSProperties
									}
								/>
							</div>
						))}
					</div>
				</SidebarGroupContent>
			</SidebarGroup>
		)
	}

	if (history?.length === 0) {
		return (
			<SidebarGroup>
				<SidebarGroupContent>
					<div className="flex w-full flex-row items-center justify-center gap-2 px-2 text-sm text-zinc-500">
						{limitLiked
							? dictionary.sidebar.actions.addChats.likeLimited[currentLanguage.code]
							: dictionary.sidebar.actions.addChats.all[currentLanguage.code]}
					</div>
				</SidebarGroupContent>
			</SidebarGroup>
		)
	}

	const groupChatsByDate = (chats: Chat[]): GroupedChats => {
		const now = new Date()
		const oneWeekAgo = subWeeks(now, 1)
		const oneMonthAgo = subMonths(now, 1)

		return chats.reduce(
			(groups, chat) => {
				const chatDate = new Date(chat.createdAt)

				if (isToday(chatDate)) {
					groups.today.push(chat)
				} else if (isYesterday(chatDate)) {
					groups.yesterday.push(chat)
				} else if (chatDate > oneWeekAgo) {
					groups.lastWeek.push(chat)
				} else if (chatDate > oneMonthAgo) {
					groups.lastMonth.push(chat)
				} else {
					groups.older.push(chat)
				}

				return groups
			},
			{
				today: [],
				yesterday: [],
				lastWeek: [],
				lastMonth: [],
				older: [],
			} as GroupedChats
		)
	}

	return (
		<>
			<SidebarGroup>
				<SidebarGroupContent>
					<SidebarMenu>
						{history &&
							(() => {
								const groupedChats = groupChatsByDate(history)

								return (
									<div className="space-y-6">
										{groupedChats.today.length > 0 && (
											<div>
												<div className="px-2 py-1 text-xs text-sidebar-foreground/50">
													{dictionary.history.today[currentLanguage.code]}
												</div>
												{groupedChats.today.map((chat) => (
													<ChatItem
														key={chat.id}
														chat={chat}
														isActive={chat.id === id}
														onDelete={(chatId) => {
															setDeleteId(chatId)
															setShowDeleteDialog(true)
														}}
														setOpenMobile={setOpenMobile}
													/>
												))}
											</div>
										)}

										{groupedChats.yesterday.length > 0 && (
											<div>
												<div className="px-2 py-1 text-xs text-sidebar-foreground/50">
													{dictionary.history.yesterday[currentLanguage.code]}
												</div>
												{groupedChats.yesterday.map((chat) => (
													<ChatItem
														key={chat.id}
														chat={chat}
														isActive={chat.id === id}
														onDelete={(chatId) => {
															setDeleteId(chatId)
															setShowDeleteDialog(true)
														}}
														setOpenMobile={setOpenMobile}
													/>
												))}
											</div>
										)}

										{groupedChats.lastWeek.length > 0 && (
											<div>
												<div className="px-2 py-1 text-xs text-sidebar-foreground/50">
													{dictionary.history.lastWeek[currentLanguage.code]}
												</div>
												{groupedChats.lastWeek.map((chat) => (
													<ChatItem
														key={chat.id}
														chat={chat}
														isActive={chat.id === id}
														onDelete={(chatId) => {
															setDeleteId(chatId)
															setShowDeleteDialog(true)
														}}
														setOpenMobile={setOpenMobile}
													/>
												))}
											</div>
										)}

										{groupedChats.lastMonth.length > 0 && (
											<div>
												<div className="px-2 py-1 text-xs text-sidebar-foreground/50">
													{dictionary.history.lastMonth[currentLanguage.code]}
												</div>
												{groupedChats.lastMonth.map((chat) => (
													<ChatItem
														key={chat.id}
														chat={chat}
														isActive={chat.id === id}
														onDelete={(chatId) => {
															setDeleteId(chatId)
															setShowDeleteDialog(true)
														}}
														setOpenMobile={setOpenMobile}
													/>
												))}
											</div>
										)}

										{groupedChats.older.length > 0 && (
											<div>
												<div className="px-2 py-1 text-xs text-sidebar-foreground/50">
													{dictionary.history.older[currentLanguage.code]}
												</div>
												{groupedChats.older.map((chat) => (
													<ChatItem
														key={chat.id}
														chat={chat}
														isActive={chat.id === id}
														onDelete={(chatId) => {
															setDeleteId(chatId)
															setShowDeleteDialog(true)
														}}
														setOpenMobile={setOpenMobile}
													/>
												))}
											</div>
										)}
									</div>
								)
							})()}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
			<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{dictionary.sidebar.actions.delete.confirmation[currentLanguage.code]}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{dictionary.sidebar.actions.delete.details[currentLanguage.code]}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>
							{dictionary.sidebar.actions.delete.cancel[currentLanguage.code]}
						</AlertDialogCancel>
						<AlertDialogAction onClick={handleDelete}>
							{dictionary.sidebar.actions.delete.continue[currentLanguage.code]}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
