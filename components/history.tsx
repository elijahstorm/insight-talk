'use client'

import { Chat } from '@/lib/db/schema'
import { isToday, isYesterday, subMonths, subWeeks } from 'date-fns'
import Link from 'next/link'
import { useState } from 'react'
import { Overview } from '@/components/overview'
import { fetcher } from '@/lib/utils'
import useSWR from 'swr'
import { User } from 'next-auth'
import config from '@/features/config'
import { dictionary } from '@/lib/language/dictionary'
import { useLanguage } from '@/hooks/use-language'
import HistoryAddNewButton from './history-add-new-button'

type GroupedChats = {
	today: Chat[]
	yesterday: Chat[]
	lastWeek: Chat[]
	lastMonth: Chat[]
	older: Chat[]
}

const typeEmojis = {
	romance: '💞',
	friend: '👫',
	workplace: '💼',
	family: '👪',
} as const

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
			today: [
				{
					id: 'history-add-new-button',
					createdAt: new Date(),
					type: [''],
					title: '',
					userName: '',
					summary: '',
					userId: '',
					visibility: 'private',
				},
			],
			yesterday: [],
			lastWeek: [],
			lastMonth: [],
			older: [],
		} as GroupedChats
	)
}

const Skeleton = () => {
	const { currentLanguage } = useLanguage()

	return (
		<div className="space-y-4">
			<div className="flex w-full text-sm font-thin text-slate-500 dark:text-slate-200">
				<h1>{dictionary.history.today[currentLanguage.code]}</h1>
			</div>

			<div className="grid grid-cols-2 gap-4">
				{[
					[44, 68],
					[32, 87],
					[28, 43],
					[64, 33],
					[52, 23],
					[56, 45],
				].map((item) => (
					<div key={item[0]} className="space-y-4 rounded-md border p-4 text-slate-800">
						<div className="flex w-full items-center gap-2">
							<div
								className="h-4 max-w-[--skeleton-width] flex-1 animate-pulse rounded-md bg-sidebar-accent-foreground/10 dark:bg-slate-600"
								style={
									{
										'--skeleton-width': `${item[0]}%`,
									} as React.CSSProperties
								}
							/>
							{config.search.dropdownFilter && (
								<div className="ml-auto size-6 animate-pulse rounded-full border border-slate-500 bg-slate-100 pl-1 pt-0.5 text-sm"></div>
							)}
						</div>
						<div
							className="h-4 max-w-[--skeleton-width] flex-1 animate-pulse rounded-md bg-sidebar-accent-foreground/10 dark:bg-slate-600"
							style={
								{
									'--skeleton-width': `${item[1]}%`,
								} as React.CSSProperties
							}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

const ShowHistory = ({
	history = [],
	filter,
	typeFilter,
}: {
	history?: Chat[]
	filter: string
	typeFilter: 'none' | keyof typeof typeEmojis
}) => {
	const { currentLanguage } = useLanguage()

	const filteredByType =
		typeFilter === 'none' ? history : history.filter((chat) => chat.type.includes(typeFilter))
	const filteredHistory = filteredByType.filter(
		(chat) =>
			chat.title.toLowerCase().includes(filter.toLowerCase()) ||
			chat.summary.toLowerCase().includes(filter.toLowerCase())
	)

	const groupedChats = groupChatsByDate(filteredHistory)

	return (Object.keys(groupedChats) as Array<keyof GroupedChats>).map((timeGroup) =>
		groupedChats[timeGroup].length ? (
			<div key={timeGroup} className="space-y-4">
				<div className="flex w-full text-sm font-thin text-slate-500 dark:text-slate-200">
					<h1>{dictionary.history[timeGroup][currentLanguage.code]}</h1>
					<p className="ml-auto">{groupedChats[timeGroup].length}</p>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{groupedChats[timeGroup].map((chat) =>
						chat.id === 'history-add-new-button' ? (
							<HistoryAddNewButton key={chat.id} />
						) : (
							<Link
								key={chat.id}
								className="space-y-2 rounded-md border p-4 text-slate-800"
								href={`/chat/${chat.id}`}
							>
								<div className="flex w-full items-center gap-2">
									<h2 className="line-clamp-1 flex-1 text-sm font-normal dark:text-slate-100">
										{chat.title}
									</h2>
									{config.search.dropdownFilter && (
										<div className="size-6 rounded-full border border-slate-500 bg-slate-100 pl-1 pt-0.5 text-sm">
											{typeEmojis[chat.type[0] as keyof typeof typeEmojis]}
										</div>
									)}
								</div>
								<p className="line-clamp-2 text-xs font-light text-slate-400">{chat.summary}</p>
							</Link>
						)
					)}
				</div>
			</div>
		) : null
	)
}

export default function History({ user }: { user: User | undefined }) {
	const { currentLanguage } = useLanguage()
	const [filter, setFilter] = useState('')
	const [typeFilter, setTypeFilter] = useState<'none' | keyof typeof typeEmojis>('none')

	const { data: history, isLoading } = useSWR<Array<Chat>>(user ? '/api/history' : null, fetcher, {
		fallbackData: [],
	})

	return (
		<div className="flex flex-col gap-8 text-left">
			<div className="flex gap-4">
				<input
					type="text"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					className="w-full overflow-hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-800 dark:border-slate-500 dark:bg-background dark:text-slate-200 dark:placeholder:text-slate-400"
					placeholder={dictionary.history.search[currentLanguage.code]}
				/>

				{config.search.dropdownFilter && (
					<select
						value={typeFilter}
						onChange={(e) => setTypeFilter(e.target.value as 'none' | keyof typeof typeEmojis)}
						className="rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-xs text-slate-600"
					>
						<option value="none">All Types</option>
						{Object.keys(typeEmojis).map((type) => (
							<option key={type} value={type}>
								{type.charAt(0).toUpperCase() + type.slice(1)}
							</option>
						))}
					</select>
				)}
			</div>

			{isLoading ? (
				<Skeleton />
			) : (
				<div className="space-y-8">
					<ShowHistory history={history} filter={filter} typeFilter={typeFilter} />
					<Overview />
				</div>
			)}
		</div>
	)
}
