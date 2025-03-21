import { Overview } from '@/components/overview'

export default async function Page() {
	const history = []

	if (history.length === 0) {
		return <Overview />
	}

	return (
		<div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
			<input className="rounded-md bg-slate-100 text-slate-600 overflow-hidden border border-slate-200" />

			<div>history</div>
		</div>
	)
}
