import History from '@/components/history'
import AddNewButton from '@/components/add-new-button'
import { auth } from '@/app/(auth)/auth'

export default async function Page() {
	return (
		<div className="flex max-w-xl flex-col gap-8 rounded-xl p-6 text-center leading-relaxed">
			<History user={(await auth())?.user} />
			<AddNewButton />
		</div>
	)
}
