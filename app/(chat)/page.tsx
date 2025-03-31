import History from '@/components/history'
import AddNewButton from '@/components/add-new-button'
import { auth } from '@/app/(auth)/auth'
import { AppViewHeader } from '@/components/app-view-header'

export default async function Page() {
	return (
		<>
			<AppViewHeader header="History" />

			<div className="flex max-w-xl flex-col gap-8 rounded-xl p-6 text-center leading-relaxed">
				<History user={(await auth())?.user} />
				<AddNewButton />
			</div>
		</>
	)
}
