import { ReactNode, useState } from 'react'

interface DropdownConfig {
	title: string
	content: ReactNode
}

interface DropdownContentProps {
	dropdowns: DropdownConfig[]
}

export function DropdownContent({ dropdowns }: DropdownContentProps) {
	const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

	const toggleSection = (section: string) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}))
	}

	return (
		<div className="space-y-2 divide-y">
			{dropdowns.map((dropdown, index) => (
				<div key={index} className="pt-2">
					<button
						className="w-full px-4 py-1 text-left text-lg font-semibold hover:bg-muted"
						onClick={() => toggleSection(`section-${index}`)}
					>
						{dropdown.title}
					</button>
					<div
						className={`overflow-hidden transition-all duration-300 ${
							expandedSections[`section-${index}`] ? 'max-h-screen' : 'max-h-0'
						}`}
					>
						<div className="pl-2">{dropdown.content}</div>
					</div>
				</div>
			))}
		</div>
	)
}
