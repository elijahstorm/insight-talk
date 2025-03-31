import { cookies } from 'next/headers'

import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { auth } from '@/app/(auth)/auth'
import { LanguageProvider } from '@/hooks/use-language'

export const experimental_ppr = true

export default async function Layout({ children }: { children: React.ReactNode }) {
	const [session, cookieStore] = await Promise.all([auth(), cookies()])
	const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true'

	return (
		<LanguageProvider userId={session?.user?.id}>
			<SidebarProvider defaultOpen={!isCollapsed}>
				<AppSidebar user={session?.user} />
				<SidebarInset>{children}</SidebarInset>
			</SidebarProvider>
		</LanguageProvider>
	)
}
