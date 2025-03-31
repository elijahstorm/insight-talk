import { auth } from '@/app/(auth)/auth'
import { AppViewHeader } from '@/components/app-view-header'

export default async function Page() {
	const session = await auth()

	return (
		<div className="mx-auto w-full">
			<AppViewHeader header="About" user={session?.user} />

			<div className="mx-auto flex w-full max-w-4xl flex-col gap-8 rounded-xl p-6 text-center leading-relaxed">
				<h1 className="text-2xl font-bold text-accent">
					Talk Insight – AI-Based Communication Analysis
				</h1>
				<p className="text-foreground">
					💡 Your AI-driven conversation coach, Talk Insight is an AI-powered communication analysis
					tool that helps users improve interpersonal conversations, resolve conflicts, and foster
					healthier relationships.
				</p>

				<div className="text-left">
					<h2 className="text-xl font-semibold text-accent">Background</h2>
					<p className="mt-2 text-foreground">
						📌 <strong>Problem:</strong> Miscommunication is a common issue in relationships,
						workplaces, and online spaces. It leads to conflicts, emotional manipulation, and
						societal divides. Legal disputes often require structured message analysis, which can be
						challenging without the right tools.
					</p>
					<p className="mt-2 text-foreground">
						✨ <strong>Solution:</strong> Talk Insight leverages AI to analyze conversations, detect
						communication patterns, and provide actionable insights to resolve conflicts and improve
						communication.
					</p>
				</div>

				<div className="text-left">
					<h2 className="text-xl font-semibold text-accent">Target Audience</h2>
					<ul className="mt-2 list-inside list-disc text-foreground">
						<li>
							<strong>Couples:</strong> Analyze relationship dynamics and improve communication.
						</li>
						<li>
							<strong>Families:</strong> Reduce conflicts and foster understanding between parents
							and children.
						</li>
						<li>
							<strong>Workplace Professionals:</strong> Enhance team communication and resolve
							workplace conflicts.
						</li>
						<li>
							<strong>Legal Clients:</strong> Use AI-powered message analysis for disputes like
							divorce or harassment.
						</li>
						<li>
							<strong>Community Moderators:</strong> Reduce toxicity in online spaces.
						</li>
						<li>
							<strong>Political & Social Analysts:</strong> Study polarization in online
							discussions.
						</li>
						<li>
							<strong>Mental Health Experts:</strong> Gain insights into patients’ communication
							behaviors.
						</li>
					</ul>
				</div>

				<div className="text-left">
					<h2 className="text-xl font-semibold text-accent">Main Features</h2>
					<ul className="mt-2 list-inside list-disc text-foreground">
						<li>
							<strong>Conversation Analysis & Insights:</strong> Detect emotional tone, toxic
							language, and communication patterns.
						</li>
						<li>
							<strong>Legal & Dispute Resolution Tools:</strong> Identify gaslighting, coercion, and
							generate legal evidence reports.
						</li>
						<li>
							<strong>Social & Workplace Solutions:</strong> Improve team communication and reduce
							toxicity in online communities.
						</li>
						<li>
							<strong>AI-Powered Communication Coach:</strong> Provide feedback and empathetic
							response suggestions.
						</li>
						<li>
							<strong>Visualization of Communication Data:</strong> Track trends, conflict history,
							and relationship dynamics over time.
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
