import { UIMessage } from 'ai'
import { Markdown } from './markdown'

type CommunicationPatternPart = {
	type: 'com-pattern'
	name: string
	style: string
	text: string
	ratios: Array<{
		type: string
		ratio: number
	}>
	description: Array<string>
}

type InsightParts = CommunicationPatternPart

export const insightTypes = ['com-pattern']

export function isInsightMessageType(
	message: UIMessage | InsightMessageType
): message is InsightMessageType {
	return (message as InsightMessageType).insight === true
}

export type InsightMessageType = {
	id: string
	insight: true
	role: 'assistant'
	content: string
	parts: Array<InsightParts>
	experimental_attachments?: UIMessage['experimental_attachments']
}

export default function InsightMessage({
	part,
	index,
	messageId,
}: {
	part: InsightParts
	index: number
	messageId: string
	isLoading: boolean
}) {
	const { type } = part
	const key = `message-${messageId}-part-${index}`
	const colors = ['secondary', 'accent']

	const ratioTotals = part.ratios.reduce((total, ratio) => total + ratio.ratio, 0)

	if (type === 'com-pattern') {
		return (
			<div key={key} data-testid="message-content" className="flex flex-col gap-2">
				<p className="font-light">{part.name} Communication Pattern</p>
				<h1 className="text-3xl font-bold capitalize text-primary">{part.style}</h1>
				<p className="font-light">{part.text}</p>
				<div className="flex w-full py-4 text-lg font-semibold capitalize">
					{part.ratios.map((ratio, index) => (
						<div
							key={`part-${messageId}-ratio-${index}`}
							className={`bg-${colors[index]} text-${colors[index]}-foreground space-x-2 truncate px-1 py-2 text-center`}
							style={{ width: `${(ratio.ratio / ratioTotals) * 100}%` }}
							title={ratio.type}
						>
							<span>{ratio.type}</span>
							{index !== part.ratios.length - 1 && (
								<span>{(ratio.ratio / ratioTotals) * 100}%</span>
							)}
						</div>
					))}
				</div>
				<div className="font-light">
					{part.description.map((markdown, index) => (
						<Markdown key={`part-${messageId}-markdown-${index}`}>{markdown}</Markdown>
					))}
				</div>
			</div>
		)
	}
}
