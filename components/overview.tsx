'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export const Overview = () => {
	return (
		<motion.div
			key="overview"
			className="max-w-3xl mx-auto md:mt-20"
			initial={{ opacity: 0, scale: 0.98 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.98 }}
			transition={{ delay: 0.5 }}
		>
			<div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
				<h2 className="text-xl font-bold">Talk Insight</h2>
				<p>
					You can learn more about how to use the Talk Insight AI by visiting the{' '}
					<Link
						className="font-medium underline underline-offset-4"
						href="https://insight-talk.vercel.app/about"
						target="_blank"
					>
						about
					</Link>{' '}
					page.
				</p>
			</div>
		</motion.div>
	)
}
