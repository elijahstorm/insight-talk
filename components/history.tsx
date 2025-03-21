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

	const filteredHistory = history.filter(
		(chat) =>
			chat.title.toLowerCase().includes(filter.toLowerCase()) ||
			chat.summary.toLowerCase().includes(filter.toLowerCase())
	)

	const colorNumbers = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
	const typeEmojis = {
		personal: '👫',
		workplace: '💼',
		legal: '⚖️',
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
				today: [],
				yesterday: [],
				lastWeek: [],
				lastMonth: [],
				older: [],
			} as GroupedChats
		)
	}

	const groupedChats = groupChatsByDate(history)

	return (
		<div className="flex flex-col gap-8">
			<input
				type="text"
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
				className="rounded-md bg-slate-100 text-slate-600 overflow-hidden border border-slate-200 py-2 px-3"
				placeholder="Search Conversations"
			/>

			<div className="grid grid-cols-2 gap-4">
				{filteredHistory.map((chat, index) => (
					<Link
						key={chat.id}
						className={`relative text-slate-800 p-4 rounded-md text-left bg-graphcolor-${colorNumbers[index % colorNumbers.length]}`}
						href={`/chat/${chat.id}`}
					>
						<div className="w-full flex items-center gap-2">
							<h2
								className={`font-semibold flex-1 text-sm text-graphtextcolor-${colorNumbers[index % colorNumbers.length]} line-clamp-1`}
							>
								{chat.title}
							</h2>
							<div className="pl-1 pt-0.5 text-sm rounded-full h-6 w-6 bg-slate-100 border border-slate-500">
								{typeEmojis[chat.type]}
							</div>
						</div>
						<p
							className={`text-sm text-graphtextcolor-${colorNumbers[index % colorNumbers.length]}/50 line-clamp-2`}
						>
							{chat.summary}
						</p>
					</Link>
				))}
			</div>
		</div>
	)
}
