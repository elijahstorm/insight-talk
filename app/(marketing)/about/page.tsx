import { auth } from '@/app/(auth)/auth'
import AboutPage from '@/components/about-page'
import { AppViewHeader } from '@/components/app-view-header'

export default async function Page() {
	const session = await auth()

	return (
		<div className="mx-auto w-full">
			<AppViewHeader header="About" user={session?.user} />

			<main>
				<AboutPage />
			</main>
		</div>
	)
}
