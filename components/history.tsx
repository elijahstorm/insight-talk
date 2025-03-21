'use client'

import { useState } from 'react'

export default function History({
	history,
}: {
	history: { title: string; summary: string; color: string }[]
}) {
	const [filter, setFilter] = useState('')

	// Filter history based on title or summary
	const filteredHistory = history.filter(
		(item) =>
			item.title.toLowerCase().includes(filter.toLowerCase()) ||
			item.summary.toLowerCase().includes(filter.toLowerCase())
	)

	return (
		<div className="flex flex-col gap-8">
			<input
				type="text"
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
				className="rounded-md bg-slate-100 text-slate-600 overflow-hidden border border-slate-200 py-2 px-3"
				placeholder="Search Conversations"
			/>

			<div className="flex flex-col gap-4">
				{filteredHistory.map((item, index) => (
					<div key={index} className="bg-slate-200 text-slate-800 p-4 rounded-md text-center">
						<h2 className="font-semibold">{item.title}</h2>
						<p className="text-sm text-slate-400">{item.summary}</p>
					</div>
				))}
			</div>
		</div>
	)
}
