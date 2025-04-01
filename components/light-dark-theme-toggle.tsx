import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function LightDarkThemeToggle() {
	const { setTheme, theme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<Button variant={'outline'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
			{theme === 'light' ? <MoonIcon /> : <SunIcon />}
		</Button>
	)
}
