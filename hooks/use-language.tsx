'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

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

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
	const [currentLanguage, setCurrentLanguage] = useState<Lang>(defaultLanguage)

	const setLanguage = (lang: Lang) => {
		setCurrentLanguage(lang)
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
