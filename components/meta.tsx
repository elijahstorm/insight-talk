import Head from 'next/head'

export default function Meta() {
	return (
		<Head>
			{/* Prioritize SVG */}
			<link rel="icon" href="/favicon.svg" type="image/svg+xml" />

			{/* Fallback PNGs */}
			<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
			<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />

			{/* Apple touch icon */}
			<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />

			{/* Android/PWA icons */}
			<link rel="manifest" href="/site.webmanifest" />
			<link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192" />
			<link rel="icon" type="image/png" href="/android-chrome-512x512.png" sizes="512x512" />

			{/* Optional for iOS theme */}
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta name="apple-mobile-web-app-status-bar-style" content="default" />
		</Head>
	)
}
