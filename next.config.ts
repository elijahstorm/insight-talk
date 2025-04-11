import type { NextConfig } from 'next'
import withPWA from 'next-pwa'

const nextConfig: NextConfig = {
	devIndicators: false,
	experimental: {
		ppr: true,
	},
	images: {
		remotePatterns: [
			{
				hostname: 'avatar.vercel.sh',
			},
		],
	},
	pwa: {
		dest: 'public',
		register: true,
		skipWaiting: true,
		disable: process.env.NODE_ENV === 'development',
	},
}

export default nextConfig
