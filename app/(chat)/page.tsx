import History from '@/components/history'
import AddNewButton from '@/components/add-new-button'
import { auth } from '@/app/(auth)/auth'

export default async function Page() {
	return (
		<div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
			<History user={(await auth())?.user} />
			<AddNewButton />
		</div>
	)
}
