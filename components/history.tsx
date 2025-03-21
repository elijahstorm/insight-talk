'use client'

import { Chat } from '@/lib/db/schema'
import { isToday, isYesterday, subMonths, subWeeks } from 'date-fns'
import Link from 'next/link'
import { useState } from 'react'

type GroupedChats = {
	today: Chat[]
	yesterday: Chat[]
	lastWeek: Chat[]
	lastMonth: Chat[]
	older: Chat[]
}

export default function History({ history }: { history: Chat[] }) {
	const [filter, setFilter] = useState('')
	const [typeFilter, setTypeFilter] = useState<'none' | keyof typeof typeEmojis>('none')

	const typeEmojis = {
		personal: '👫',
		workplace: '💼',
		legal: '⚖️',
	} as const

	const filteredByType =
		typeFilter === 'none' ? history : history.filter((chat) => chat.type === typeFilter)
	const filteredHistory = filteredByType.filter(
		(chat) =>
			chat.title.toLowerCase().includes(filter.toLowerCase()) ||
			chat.summary.toLowerCase().includes(filter.toLowerCase())
	)

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

	const groupedChats = groupChatsByDate(filteredHistory)

	const timeGroupedText = {
		today: 'Today',
		yesterday: 'Yesterday',
		lastWeek: 'Last Week',
		lastMonth: 'Last Month',
		older: 'Older',
	}

	return (
		<div className="flex flex-col gap-8 text-left">
			<div className="flex gap-4 ">
				<input
					type="text"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					className="rounded-md bg-slate-50 text-slate-800 overflow-hidden border border-slate-200 py-2 px-3 w-full"
					placeholder="Search Conversations"
				/>

				<select
					value={typeFilter}
					onChange={(e) => setTypeFilter(e.target.value as 'none' | keyof typeof typeEmojis)}
					className="rounded-md bg-slate-100 text-slate-600 border border-slate-200 py-2 px-3  text-xs"
				>
					<option value="none">All Types</option>
					{Object.keys(typeEmojis).map((type) => (
						<option key={type} value={type}>
							{type.charAt(0).toUpperCase() + type.slice(1)}
						</option>
					))}
				</select>
			</div>

			{(Object.keys(groupedChats) as Array<keyof GroupedChats>).map((timeGroup) =>
				groupedChats[timeGroup].length ? (
					<div key={timeGroup} className="space-y-2">
						<h1 className="text-slate-600 text-lg font-bold">{timeGroupedText[timeGroup]}</h1>

						<div className="grid grid-cols-2 gap-4">
							{groupedChats[timeGroup].map((chat) => (
								<Link
									key={chat.id}
									className="border text-slate-800 p-4 rounded-md bg"
									href={`/chat/${chat.id}`}
								>
									<div className="w-full flex items-center gap-2">
										<h2 className="font-semibold flex-1 text-sm line-clamp-1">{chat.title}</h2>
										<div className="pl-1 pt-0.5 text-sm rounded-full h-6 w-6 bg-slate-100 border border-slate-500">
											{typeEmojis[chat.type as keyof typeof typeEmojis]}
										</div>
									</div>
									<p className="text-sm line-clamp-2">{chat.summary}</p>
								</Link>
							))}
						</div>
					</div>
				) : null
			)}
		</div>
	)
}
