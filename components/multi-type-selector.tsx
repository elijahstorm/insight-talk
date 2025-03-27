'use client'

import { motion } from 'framer-motion'

export const MultiTypeSelector = ({
	types,
	selectedValues,
	onSelectionChange,
	selectOne = false,
}: {
	types: { title: string; types: { icon: string; type: string }[] }[]
	selectedValues: string[]
	onSelectionChange: (values: string[]) => void
	selectOne?: boolean
}) => {
	const toggleSelection = (type: string) => {
		if (selectOne) {
			onSelectionChange(selectedValues.includes(type) ? [] : [type])
		} else {
			onSelectionChange(
				selectedValues.includes(type)
					? selectedValues.filter((item) => item !== type)
					: [...selectedValues, type]
			)
		}
	}

	return (
		<motion.div
			key="overview"
			className="mx-auto max-w-3xl"
			initial={{ opacity: 0, scale: 0.98 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.98 }}
			transition={{ delay: 0.5 }}
		>
			<div className="flex max-w-xl flex-col gap-8 rounded-xl pb-2 text-left font-light leading-relaxed">
				Who was this conversation with?
			</div>
			<div className="flex flex-col gap-6">
				{types.map((group) => (
					<div key={group.title}>
						<h3 className="mb-2 text-xs font-thin">{group.title}</h3>
						<div className="flex flex-wrap gap-4 text-sm font-light">
							{group.types.map((item) => (
								<div
									key={item.type}
									className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 transition-colors ${
										selectedValues.includes(item.type)
											? 'bg-accent text-accent-foreground'
											: 'bg-white'
									}`}
									onClick={() => toggleSelection(item.type)}
								>
									<span>{item.icon}</span>
									<span>{item.type}</span>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</motion.div>
	)
}
