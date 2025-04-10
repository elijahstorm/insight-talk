import type { ComponentProps } from 'react'

import { type SidebarTrigger } from '@/components/ui/sidebar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { BackIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function BackButton({ className }: ComponentProps<typeof SidebarTrigger>) {
	const router = useRouter()

	const smartBacknav = () => {
		const prev = document.referrer
		if (!prev || prev === window.location.href || prev === '') {
			router.push('/')
		} else if (prev.includes('/new')) {
			router.push('/')
		} else {
			router.back()
		}
	}

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="ghost" className="pr-5" onClick={smartBacknav}>
					<span className="sr-only">Home</span>
					<BackIcon size={16} />
				</Button>
			</TooltipTrigger>
			<TooltipContent align="start">Home</TooltipContent>
		</Tooltip>
	)
}
