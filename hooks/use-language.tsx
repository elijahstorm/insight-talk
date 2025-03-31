'use client'

import config from '@/features/config'
import { createContext, useContext, useState, ReactNode, memo, useEffect } from 'react'
import { toast } from 'sonner'

export type Lang = {
	name: string
	code: string
}

export const languages = [
	{
		name: 'English',
		code: 'eng',
	},
	{
		name: 'Korean',
		code: 'kor',
	},
] as Array<Lang>

type LanguageContextType = {
	currentLanguage: Lang
	setLanguage: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const defaultLanguage = languages[0]

const PureLanguageProvider = ({
	userId = undefined,
	children,
}: {
	userId?: string
	children: ReactNode
}) => {
	const [currentLanguage, setCurrentLanguage] = useState<Lang>(defaultLanguage)

	useEffect(() => {
		const fetchUserLanguage = async () => {
			try {
				const response = await fetch('/api/language', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				})

				if (response.ok) {
					const data = await response.json()
					const userLanguage = languages.find((lang) => lang.code === data.language)
					if (userLanguage) {
						setCurrentLanguage(userLanguage)
					}
				}
			} catch (error) {
				if (config.errorLog) {
					console.error('Failed to fetch user language:', error)
				}
			}
		}

		if (userId) {
			fetchUserLanguage()
		}
	}, [userId])

	const setLanguage = async (lang: Lang) => {
		try {
			const response = await fetch('/api/language', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ language: lang.code }),
			})

			if (response.ok) {
				setCurrentLanguage(lang)
				toast.success('Changed your language to ' + lang.name)
			} else {
				toast.error('Failed to update your language to ' + lang.name)
			}
		} catch (error) {
			toast.error('Failed to update your language to ' + lang.name)
			if (config.errorLog) {
				console.error('Failed to update user language:', error)
			}
		}
	}

	return (
		<LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
			{children}
		</LanguageContext.Provider>
	)
}

export const useLanguage = () => {
	const context = useContext(LanguageContext)
	if (!context) {
		throw new Error('useLanguage must be used within a LanguageProvider')
	}
	return context
}

export const LanguageProvider = memo(PureLanguageProvider, (prevProps, nextProps) => {
	return prevProps.userId === nextProps.userId
})
