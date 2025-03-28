import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'

export default function LightDarkThemeToggle() {
	const { setTheme, theme } = useTheme()

	return (
		<Button variant={'outline'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
			{theme === 'light' ? <MoonIcon /> : <SunIcon />}
		</Button>
	)
}
