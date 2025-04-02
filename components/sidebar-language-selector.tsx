'use client'

import type { User } from 'next-auth'
import { memo } from 'react'

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/use-language'
import { languages } from '@/lib/language/dictionary'

const PureLanguageItem = ({
	lang,
	isActive,
}: {
	lang: (typeof languages)[number]
	isActive: boolean
}) => {
	const { setLanguage } = useLanguage()

	const changeLang = (lang: (typeof languages)[number]) => () => {
		setLanguage(lang)
	}

	return (
		<SidebarMenuItem>
			<SidebarMenuButton asChild isActive={isActive}>
				<Button variant="ghost" className="w-full text-left" onClick={changeLang(lang)}>
					<span className="w-full">{lang.name}</span>
				</Button>
			</SidebarMenuButton>
		</SidebarMenuItem>
	)
}

export const LanguageItem = memo(PureLanguageItem, (prevProps, nextProps) => {
	if (prevProps.isActive !== nextProps.isActive) return false
	return true
})

export function SidebarLanguageSelector({ user }: { user: User | undefined }) {
	const { currentLanguage } = useLanguage()

	if (!user) {
		return (
			<SidebarGroup>
				<SidebarGroupContent>
					<div className="flex w-full flex-row items-center justify-center gap-2 px-2 text-sm text-zinc-500">
						Login to customize your experience!
					</div>
				</SidebarGroupContent>
			</SidebarGroup>
		)
	}

	// todo, we might load lang from a datasource
	// if (languages?.length === 0) {
	// 	return (
	// 		<SidebarGroup>
	// 			<SidebarGroupContent>
	// 				<div className="flex w-full flex-row items-center justify-center gap-2 px-2 text-sm text-zinc-500">
	// 					No languages loaded in!
	// 				</div>
	// 			</SidebarGroupContent>
	// 		</SidebarGroup>
	// 	)
	// }

	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu>
					{languages.map((lang) => (
						<LanguageItem
							key={lang.code}
							lang={lang}
							isActive={lang.code === currentLanguage.code}
						/>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
