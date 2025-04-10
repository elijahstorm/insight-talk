'use client'

import { useLanguage } from '@/hooks/use-language'
import { dictionary } from '@/lib/language/dictionary'

export default function AboutPage() {
	const { currentLanguage } = useLanguage()

	return (
		<div className="mx-auto flex w-full max-w-4xl flex-col gap-8 rounded-xl p-6 text-center leading-relaxed">
			<h1 className="text-2xl font-bold text-accent">
				{dictionary.about.header[currentLanguage.code]}
			</h1>
			<p className="text-foreground">{dictionary.about.info[currentLanguage.code]}</p>

			<div className="text-left">
				<h2 className="text-xl font-semibold text-accent">
					{dictionary.about.background.title[currentLanguage.code]}
				</h2>
				<p className="mt-2 text-foreground">
					📌 <strong>{dictionary.about.background.problem.title[currentLanguage.code]}:</strong>{' '}
					{dictionary.about.background.problem.info[currentLanguage.code]}
				</p>
				<p className="mt-2 text-foreground">
					✨ <strong>{dictionary.about.background.solution.title[currentLanguage.code]}:</strong>{' '}
					{dictionary.about.background.solution.info[currentLanguage.code]}
				</p>
			</div>

			<div className="text-left">
				<h2 className="text-xl font-semibold text-accent">
					{dictionary.about.targetAudience.title[currentLanguage.code]}
				</h2>
				<ul className="mt-2 list-inside list-disc text-foreground">
					<li>
						<strong>{dictionary.about.targetAudience.couples.title[currentLanguage.code]}:</strong>{' '}
						{dictionary.about.targetAudience.couples.info[currentLanguage.code]}
					</li>
					<li>
						<strong>{dictionary.about.targetAudience.families.title[currentLanguage.code]}:</strong>{' '}
						{dictionary.about.targetAudience.families.info[currentLanguage.code]}
					</li>
					<li>
						<strong>
							{dictionary.about.targetAudience.professionals.title[currentLanguage.code]}:
						</strong>{' '}
						{dictionary.about.targetAudience.professionals.info[currentLanguage.code]}
					</li>
					<li>
						<strong>
							{dictionary.about.targetAudience.legalClients.title[currentLanguage.code]}:
						</strong>{' '}
						{dictionary.about.targetAudience.legalClients.info[currentLanguage.code]}
					</li>
					<li>
						<strong>
							{dictionary.about.targetAudience.communityModerators.title[currentLanguage.code]}:
						</strong>{' '}
						{dictionary.about.targetAudience.communityModerators.info[currentLanguage.code]}
					</li>
					<li>
						<strong>
							{dictionary.about.targetAudience.politicalAnalysts.title[currentLanguage.code]}:
						</strong>{' '}
						{dictionary.about.targetAudience.politicalAnalysts.info[currentLanguage.code]}
					</li>
					<li>
						<strong>
							{dictionary.about.targetAudience.mentalHealthExperts.title[currentLanguage.code]}:
						</strong>{' '}
						{dictionary.about.targetAudience.mentalHealthExperts.info[currentLanguage.code]}
					</li>
				</ul>
			</div>

			<div className="text-left">
				<h2 className="text-xl font-semibold text-accent">
					{dictionary.about.features.title[currentLanguage.code]}
				</h2>
				<ul className="mt-2 list-inside list-disc text-foreground">
					<li>
						<strong>{dictionary.about.features.insights.title[currentLanguage.code]}:</strong>{' '}
						{dictionary.about.features.insights.info[currentLanguage.code]}
					</li>
					<li>
						<strong>{dictionary.about.features.legal.title[currentLanguage.code]}:</strong>{' '}
						{dictionary.about.features.legal.info[currentLanguage.code]}
					</li>
					<li>
						<strong>
							{dictionary.about.features.socialSolutions.title[currentLanguage.code]}:
						</strong>{' '}
						{dictionary.about.features.socialSolutions.info[currentLanguage.code]}
					</li>
					<li>
						<strong>
							{dictionary.about.features.communicationCoach.title[currentLanguage.code]}:
						</strong>{' '}
						{dictionary.about.features.communicationCoach.info[currentLanguage.code]}
					</li>
					<li>
						<strong>{dictionary.about.features.visualization.title[currentLanguage.code]}:</strong>{' '}
						{dictionary.about.features.visualization.info[currentLanguage.code]}
					</li>
				</ul>
			</div>
		</div>
	)
}
