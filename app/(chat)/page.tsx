import { Overview } from '@/components/overview'
import History from '@/components/history'
import { Chat } from '@/lib/db/schema'

export default function Page() {
	const history = [
		{
			id: '1b4e28ba-2fa1-11d2-883f-0016d3cca427',
			title: 'Sarah Johnson',
			summary: 'Discussed meeting for lunch next week at her favorite spot.',
			type: 'personal',
			date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
		},
		{
			id: '4b6f4c8a-3e2d-4d9a-8b9e-2b7e4c8a3e2d',
			title: 'Team Standup Notes',
			summary: 'Reviewed project updates and blockers for the current sprint.',
			type: 'workplace',
			date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
		},
		{
			id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
			title: 'Contract Dispute with Vendor',
			summary: 'Discussed terms of the contract and potential resolution options.',
			type: 'legal',
			date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 1 month ago
		},
		{
			id: 'd94f3f01-2b25-4c8a-8b9e-2b7e4c8a3e2d',
			title: 'Alex "The Brain" Carter 🧠',
			summary: 'Talked about organizing a surprise party for a friend.',
			type: 'personal',
			date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
		},
		{
			id: 'e4d909c2-7425-40de-944b-e07fc1f90ae7',
			title: 'Quarterly Review Meeting',
			summary: 'Analyzed team performance and set goals for next quarter.',
			type: 'workplace',
			date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
		},
		{
			id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
			title: 'Neighbor Dispute Resolution',
			summary: 'Discussed property boundary issues and possible legal actions.',
			type: 'legal',
			date: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year ago
		},
		{
			id: '6fa459ea-ee8a-3ca4-894e-db77e160355e',
			title: 'Emily Davis',
			summary: 'Talked about family updates and upcoming holiday plans.',
			type: 'personal',
			date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
		},
		{
			id: '70c7b5b8-7425-40de-944b-e07fc1f90ae7',
			title: 'Client Presentation Feedback',
			summary: 'Received feedback on the recent presentation for a new client.',
			type: 'workplace',
			date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
		},
		{
			id: '9e107d9d-7425-40de-944b-e07fc1f90ae7',
			title: 'Lease Agreement Review',
			summary: 'Reviewed terms of a lease agreement for a rental property.',
			type: 'legal',
			date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 2 months ago
		},
		{
			id: '3c6e0b8a-7425-40de-944b-e07fc1f90ae7',
			title: 'Mike "The Fixer" Thompson 🔧',
			summary: 'Caught up on life updates and shared career advice.',
			type: 'personal',
			date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
		},
		{
			id: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
			title: 'Project Kickoff Meeting',
			summary: 'Discussed project goals, timelines, and team responsibilities.',
			type: 'workplace',
			date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
		},
		{
			id: 'b2c3d4e5-6789-01ab-cdef-2345678901bc',
			title: 'Jessica "Jessie" Brown 🌟',
			summary: 'Talked about destinations and activities for the upcoming trip.',
			type: 'personal',
			date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
		},
		{
			id: 'c3d4e5f6-7890-12ab-cdef-3456789012cd',
			title: 'Consultation on Property',
			summary: 'Discussed legal implications of selling inherited property.',
			type: 'legal',
			date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 3 months ago
		},
		{
			id: 'd4e5f6g7-8901-23ab-cdef-4567890123de',
			title: 'Team Brainstorming Session',
			summary: 'Generated ideas for the upcoming marketing campaign.',
			type: 'workplace',
			date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
		},
		{
			id: 'e5f6g7h8-9012-34ab-cdef-5678901234ef',
			title: 'Chris "Captain" Evans 🚀',
			summary: 'Caught up on life updates and reminisced about old times.',
			type: 'personal',
			date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
		},
		{
			id: 'f6g7h8i9-0123-45ab-cdef-6789012345fg',
			title: 'Contract Negotiation with Client',
			summary: 'Discussed terms and conditions for the new service agreement.',
			type: 'legal',
			date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
		},
		{
			id: 'g7h8i9j0-1234-56ab-cdef-7890123456gh',
			title: 'One-on-One with Manager',
			summary: 'Reviewed performance and discussed career growth opportunities.',
			type: 'workplace',
			date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
		},
		{
			id: 'h8i9j0k1-2345-67ab-cdef-8901234567hi',
			title: 'Taylor "TayTay" Wilson 🎵',
			summary: 'Watched a new movie and shared snacks together.',
			type: 'personal',
			date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
		},
		{
			id: 'i9j0k1l2-3456-78ab-cdef-9012345678ij',
			title: 'Review of NDA',
			summary: 'Reviewed non-disclosure agreement for a potential partnership.',
			type: 'legal',
			date: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(), // 6 months ago
		},
		{
			id: 'j1k2l3m4-4567-89ab-cdef-0123456789jk',
			title: 'Daniel "Danny Boy" Martinez 🎸',
			summary: 'Discussed family updates and plans for the upcoming weekend.',
			type: 'personal',
			date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
		},
		{
			id: 'k2l3m4n5-5678-90ab-cdef-1234567890kl',
			title: 'Budget Review Meeting',
			summary: 'Analyzed department expenses and discussed cost-saving measures.',
			type: 'workplace',
			date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
		},
		{
			id: 'l3m4n5o6-6789-01ab-cdef-2345678901lm',
			title: 'Property Line Dispute',
			summary: 'Reviewed legal documents regarding a neighbor property line issue.',
			type: 'legal',
			date: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(), // 4 months ago
		},
		{
			id: 'm4n5o6p7-7890-12ab-cdef-3456789012mn',
			title: 'Sophia "Sophie" Anderson 🌸',
			summary: 'Caught up on life events and shared career advice.',
			type: 'personal',
			date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
		},
		{
			id: 'n5o6p7q8-8901-23ab-cdef-4567890123no',
			title: 'Team Retrospective',
			summary: 'Discussed successes and challenges from the last sprint.',
			type: 'workplace',
			date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), // 9 days ago
		},
		{
			id: 'o6p7q8r9-9012-34ab-cdef-5678901234op',
			title: 'Contract Review with Lawyer',
			summary: 'Reviewed terms of a new business contract with legal counsel.',
			type: 'legal',
			date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 2 months ago
		},
		{
			id: 'p7q8r9s0-0123-45ab-cdef-6789012345pq',
			title: 'Ryan "The Chef" Lee 🍳',
			summary: 'Shared stories and planned a family reunion for next year.',
			type: 'personal',
			date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
		},
		{
			id: 'q8r9s0t1-1234-56ab-cdef-7890123456qr',
			title: 'Client Onboarding Session',
			summary: 'Introduced new client to the team and discussed project goals.',
			type: 'workplace',
			date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(), // 18 days ago
		},
		{
			id: 'r9s0t1u2-2345-67ab-cdef-8901234567rs',
			title: 'Advice on Will',
			summary: 'Consulted lawyer about drafting a will and inheritance planning.',
			type: 'legal',
			date: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(), // 6.5 months ago
		},
		{
			id: 's0t1u2v3-3456-78ab-cdef-9012345678st',
			title: 'Olivia "Liv" Garcia 🌈',
			summary: 'Planned a hiking trip with friends for the upcoming weekend.',
			type: 'personal',
			date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
		},
		{
			id: 't1u2v3w4-4567-89ab-cdef-0123456789tu',
			title: 'Quarterly Sales Review',
			summary: 'Analyzed sales performance and discussed strategies for improvement.',
			type: 'workplace',
			date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 1 month ago
		},
		{
			id: 'u2v3w4x5-5678-90ab-cdef-1234567890uv',
			title: 'Dispute Over Rental Agreement',
			summary: 'Discussed legal options for resolving a rental agreement issue.',
			type: 'legal',
			date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 3 months ago
		},
		{
			id: 'v3w4x5y6-6789-01ab-cdef-2345678901vw',
			title: 'Ethan "Speedy" Walker 🏃‍♂️',
			summary: 'Organized a surprise birthday party for a close friend.',
			type: 'personal',
			date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
		},
		{
			id: 'w4x5y6z7-7890-12ab-cdef-3456789012wx',
			title: 'Team Training Workshop',
			summary: 'Conducted a workshop to improve team collaboration and skills.',
			type: 'workplace',
			date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days ago
		},
		{
			id: 'x5y6z7a8-8901-23ab-cdef-4567890123xy',
			title: 'Consultation on Taxes',
			summary: 'Reviewed tax obligations and strategies with a legal advisor.',
			type: 'legal',
			date: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(), // 5 months ago
		},
		{
			id: 'y6z7a8b9-9012-34ab-cdef-5678901234yz',
			title: 'Chloe "Coco" Harris 🐻',
			summary: 'Planned a relaxing picnic with friends at a local park.',
			type: 'personal',
			date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
		},
		{
			id: 'z7a8b9c0-0123-45ab-cdef-6789012345za',
			title: 'Project Milestone Celebration',
			summary: 'Celebrated the completion of a major project milestone.',
			type: 'workplace',
			date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(), // 40 days ago
		},
		{
			id: 'a8b9c0d1-1234-56ab-cdef-7890123456ab',
			title: 'Review of Partnership',
			summary: 'Reviewed partnership agreement terms with a legal consultant.',
			type: 'legal',
			date: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(), // 10 months ago
		},
		{
			id: 'b9c0d1e2-2345-67ab-cdef-8901234567bc',
			title: 'Jack "Joker" Robinson 🤡',
			summary: 'Shared stories and updates during a family dinner gathering.',
			type: 'personal',
			date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
		},
		{
			id: 'c0d1e2f3-3456-78ab-cdef-9012345678cd',
			title: 'Team Building Activity',
			summary: 'Participated in a team-building activity to improve morale.',
			type: 'workplace',
			date: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(), // 50 days ago
		},
		{
			id: 'd1e2f3g4-4567-89ab-cdef-0123456789de',
			title: 'Ava "Sunshine" Clark ☀️',
			summary: 'Reconnected with an old friend and shared life updates.',
			type: 'personal',
			date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
		},
		{
			id: 'e2f3g4h5-5678-90ab-cdef-1234567890ef',
			title: 'Department Strategy Meeting',
			summary: 'Discussed long-term goals and strategies for the department.',
			type: 'workplace',
			date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
		},
		{
			id: 'f3g4h5i6-6789-01ab-cdef-2345678901fg',
			title: 'Advice on Divorce',
			summary: 'Consulted a lawyer about divorce proceedings and legal implications.',
			type: 'legal',
			date: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(), // 6 months ago
		},
		{
			id: 'g4h5i6j7-7890-12ab-cdef-3456789012gh',
			title: 'Noah "Navigator" Lewis 🧭',
			summary: 'Played board games and spent quality time with family.',
			type: 'personal',
			date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
		},
		{
			id: 'h5i6j7k8-8901-23ab-cdef-4567890123hi',
			title: 'Team Leadership Training',
			summary: 'Attended a workshop on improving leadership and management skills.',
			type: 'workplace',
			date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
		},
		{
			id: 'i6j7k8l9-9012-34ab-cdef-5678901234ij',
			title: 'Property Dispute Mediation',
			summary: 'Mediated a dispute over shared property boundaries with neighbors.',
			type: 'legal',
			date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 3 months ago
		},
		{
			id: 'j7k8l9m0-0123-45ab-cdef-6789012345jk',
			title: 'Mia "Mimi" Hall 🐾',
			summary: 'Spent time discussing future plans and enjoying coffee together.',
			type: 'personal',
			date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
		},
		{
			id: 'k8l9m0n1-1234-56ab-cdef-7890123456kl',
			title: 'Quarterly Budget Planning',
			summary: 'Reviewed financial reports and planned the next quarter’s budget.',
			type: 'workplace',
			date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 1 month ago
		},
		{
			id: 'l9m0n1o2-2345-67ab-cdef-8901234567lm',
			title: 'Review of Employment Contract',
			summary: 'Reviewed terms of a new employment contract with a lawyer.',
			type: 'legal',
			date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 2 months ago
		},
		{
			id: 'm0n1o2p3-3456-78ab-cdef-9012345678mn',
			title: 'Liam "The Legend" Young 🏆',
			summary: 'Shared stories and laughter over a meal with a close friend.',
			type: 'personal',
			date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
		},
	] as Chat[]

	if (history.length === 0) {
		return (
			<>
				<Overview />
			</>
		)
	}

	return (
		<div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
			<History history={history} />
		</div>
	)
}
