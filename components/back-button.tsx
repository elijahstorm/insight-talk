import type { ComponentProps } from 'react'

import { type SidebarTrigger } from '@/components/ui/sidebar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { HomeIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function BackButton({ className }: ComponentProps<typeof SidebarTrigger>) {
	const router = useRouter()

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="outline" className="px-2" onClick={() => router.back()}>
					<span className="sr-only">Home</span>
					<HomeIcon size={16} />
				</Button>
			</TooltipTrigger>
			<TooltipContent align="start">Home</TooltipContent>
		</Tooltip>
	)
}
