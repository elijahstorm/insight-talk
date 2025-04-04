import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		fontFamily: {
			sans: ['geist'],
			mono: ['geist-mono'],
		},
		extend: {
			screens: {
				'toast-mobile': '600px',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					50: '#26BOBA',
					100: '#23AOA9',
					200: '#1F9098',
					300: '#1C8087',
					400: '#187077',
					500: '#125358',
					600: '#115055',
					700: '#OE4044',
					800: '#0A3033',
					950: '#072022',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				graphcolor: {
					50: '#E5F0FA',
					100: '#4A89DC',
					200: '#37BC9B',
					300: '#F6BB42',
					400: '#E9573F',
					500: '#8CC152',
					600: '#4FC1E9',
					700: '#967ADC',
					800: '#ED5565',
					900: '#D770AD',
					950: '#12385E',
				},
				graphtextcolor: {
					50: '#1A1A1A',
					100: '#FFFFFF',
					200: '#FFFFFF',
					300: '#1A1A1A',
					400: '#FFFFFF',
					500: '#1A1A1A',
					600: '#FFFFFF',
					700: '#FFFFFF',
					800: '#FFFFFF',
					900: '#FFFFFF',
					950: '#FFFFFF',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))',
				},
			},
		},
	},
	safelist: [
		'bg-graphcolor-50',
		'bg-graphcolor-100',
		'bg-graphcolor-200',
		'bg-graphcolor-300',
		'bg-graphcolor-400',
		'bg-graphcolor-500',
		'bg-graphcolor-600',
		'bg-graphcolor-700',
		'bg-graphcolor-800',
		'bg-graphcolor-900',
		'bg-graphcolor-950',
		'bg-graphcolor-50/50',
		'bg-graphcolor-100/50',
		'bg-graphcolor-200/50',
		'bg-graphcolor-300/50',
		'bg-graphcolor-400/50',
		'bg-graphcolor-500/50',
		'bg-graphcolor-600/50',
		'bg-graphcolor-700/50',
		'bg-graphcolor-800/50',
		'bg-graphcolor-900/50',
		'bg-graphcolor-950/50',
		'bg-graphcolor-50/30',
		'bg-graphcolor-100/30',
		'bg-graphcolor-200/30',
		'bg-graphcolor-300/30',
		'bg-graphcolor-400/30',
		'bg-graphcolor-500/30',
		'bg-graphcolor-600/30',
		'bg-graphcolor-700/30',
		'bg-graphcolor-800/30',
		'bg-graphcolor-900/30',
		'bg-graphcolor-950/30',
		'bg-graphcolor-50/20',
		'bg-graphcolor-100/20',
		'bg-graphcolor-200/20',
		'bg-graphcolor-300/20',
		'bg-graphcolor-400/20',
		'bg-graphcolor-500/20',
		'bg-graphcolor-600/20',
		'bg-graphcolor-700/20',
		'bg-graphcolor-800/20',
		'bg-graphcolor-900/20',
		'bg-graphcolor-950/20',
		'text-graphtextcolor-50',
		'text-graphtextcolor-100',
		'text-graphtextcolor-200',
		'text-graphtextcolor-300',
		'text-graphtextcolor-400',
		'text-graphtextcolor-500',
		'text-graphtextcolor-600',
		'text-graphtextcolor-700',
		'text-graphtextcolor-800',
		'text-graphtextcolor-900',
		'text-graphtextcolor-950',
		'text-graphtextcolor-50/50',
		'text-graphtextcolor-100/50',
		'text-graphtextcolor-200/50',
		'text-graphtextcolor-300/50',
		'text-graphtextcolor-400/50',
		'text-graphtextcolor-500/50',
		'text-graphtextcolor-600/50',
		'text-graphtextcolor-700/50',
		'text-graphtextcolor-800/50',
		'text-graphtextcolor-900/50',
		'text-graphtextcolor-950/50',
		'text-graphtextcolor-50/30',
		'text-graphtextcolor-100/30',
		'text-graphtextcolor-200/30',
		'text-graphtextcolor-300/30',
		'text-graphtextcolor-400/30',
		'text-graphtextcolor-500/30',
		'text-graphtextcolor-600/30',
		'text-graphtextcolor-700/30',
		'text-graphtextcolor-800/30',
		'text-graphtextcolor-900/30',
		'text-graphtextcolor-950/30',
		'text-graphtextcolor-50/20',
		'text-graphtextcolor-100/20',
		'text-graphtextcolor-200/20',
		'text-graphtextcolor-300/20',
		'text-graphtextcolor-400/20',
		'text-graphtextcolor-500/20',
		'text-graphtextcolor-600/20',
		'text-graphtextcolor-700/20',
		'text-graphtextcolor-800/20',
		'text-graphtextcolor-900/20',
		'text-graphtextcolor-950/20',
	],
	plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
export default config
