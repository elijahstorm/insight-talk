import { Overview } from '@/components/overview'
import History from '@/components/history'

export default function Page() {
	const history = [
		{
			title: 'Meeting Notes 101',
			summary: 'Summary of the meeting held on March 1st, 2025',
			color: '#f00',
		},
		{
			title: 'Project Alpha 202',
			summary: 'Details about the Alpha project milestones',
			color: '#0f0',
		},
		{
			title: 'Shopping List 303',
			summary: 'Groceries and other items to buy this weekend',
			color: '#00f',
		},
		{
			title: 'Cookie Monster 404',
			summary: 'A fun summary about cookies and their history',
			color: '#ff0',
		},
	]

	if (history.length === 0) {
		return (
			<>
				<Overview />
			</>
		)
	}

	return (
		<div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
			<History history={history} />
		</div>
	)
}
