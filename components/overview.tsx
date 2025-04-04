'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export const Overview = () => {
	return (
		<motion.div
			key="overview"
			className="mx-auto max-w-3xl md:mt-20"
			initial={{ opacity: 0, scale: 0.98 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.98 }}
			transition={{ delay: 0.5 }}
		>
			<div className="flex w-full max-w-3xl flex-col gap-8 rounded-xl p-6 text-center leading-relaxed">
				<h2 className="text-xl font-bold">Talk Insight</h2>
				<p>
					You can learn more about how to use the Talk Insight AI by visiting the{' '}
					<Link className="font-medium underline underline-offset-4" href="/about" target="_blank">
						about
					</Link>{' '}
					page.
				</p>
			</div>
		</motion.div>
	)
}
