import History from '@/components/history'
import FloatingAddNewButton from '@/components/floating-add-new-button'
import { auth } from '@/app/(auth)/auth'
import { AppViewHeader } from '@/components/app-view-header'
import config from '@/features/config'

export default async function Page() {
	return (
		<>
			<AppViewHeader header="History" />

			<main className="mx-auto flex w-full max-w-xl flex-col gap-8 rounded-xl p-6 text-center leading-relaxed md:max-w-4xl">
				<History user={(await auth())?.user} />
				{config.search.floatingAddNewButton ? <FloatingAddNewButton /> : <></>}
			</main>
		</>
	)
}
