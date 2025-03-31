import { auth } from '@/app/(auth)/auth'
import { AppViewHeader } from '@/components/app-view-header'

export default async function Page() {
	const session = await auth()

	return (
		<div className="mx-auto w-full">
			<AppViewHeader user={session?.user} />

			<div className="mx-auto flex w-full max-w-4xl flex-col gap-8 rounded-xl p-6 text-center leading-relaxed">
				<h1 className="text-2xl font-bold text-accent">My Page</h1>
				<h1 className="text-2xl font-bold text-accent">Todo...</h1>
				<p className="text-foreground">{session?.user?.email}</p>
				<p className="text-foreground">{session?.user?.name}</p>
			</div>
		</div>
	)
}
