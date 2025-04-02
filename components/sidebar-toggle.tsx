import type { ComponentProps } from 'react'

import { type SidebarTrigger, useSidebar } from '@/components/ui/sidebar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { SidebarLeftIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { dictionary } from '@/lib/language/dictionary'
import { useLanguage } from '@/hooks/use-language'

export function SidebarToggle({ className }: ComponentProps<typeof SidebarTrigger>) {
	const { toggleSidebar } = useSidebar()
	const { currentLanguage } = useLanguage()

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button onClick={toggleSidebar} variant="outline" className="md:h-fit md:px-2">
					<SidebarLeftIcon size={16} />
				</Button>
			</TooltipTrigger>
			<TooltipContent align="start">
				{dictionary.tooltips.toggleSidebar[currentLanguage.code]}
			</TooltipContent>
		</Tooltip>
	)
}
