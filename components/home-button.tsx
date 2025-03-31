import type { ComponentProps } from 'react'

import { type SidebarTrigger } from '@/components/ui/sidebar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { HomeIcon } from './icons'
import { Button } from './ui/button'
import { usePathname, useRouter } from 'next/navigation'

export function HomeButton({ className }: ComponentProps<typeof SidebarTrigger>) {
	const router = useRouter()
	const pathname = usePathname()

	if (pathname === '/') {
		return null
	}

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="outline" onClick={() => router.push('/')}>
					<span className="sr-only">Home</span>
					<HomeIcon size={16} />
				</Button>
			</TooltipTrigger>
			<TooltipContent align="start">Home</TooltipContent>
		</Tooltip>
	)
}
