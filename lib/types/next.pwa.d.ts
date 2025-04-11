declare module 'next-pwa' {
	import { NextConfig } from 'next'
	const withPWA: (config: NextConfig) => NextConfig
	export default withPWA
}
