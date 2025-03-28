import { UIMessage } from 'ai'
import { Markdown } from './markdown'
import { useCopyToClipboard } from 'usehooks-ts'
import { toast } from 'sonner'
import { CopyIcon } from './icons'
import { Button } from './ui/button'

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

type InsightPart = {
	type: 'insight'
	text: Array<string>
}

type RepliesPart = {
	type: 'replies'
	replies: Array<{
		title: string
		lines: Array<string>
	}>
}

export type InsightParts = CommunicationPatternPart | InsightPart | RepliesPart

export const insightTypes = ['com-pattern', 'insight', 'replies']

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
	const [_, copyToClipboard] = useCopyToClipboard()

	const { type } = part
	const key = `message-${messageId}-part-${index}`
	const colors = ['secondary', 'accent']

	if (type === 'com-pattern') {
		const ratioTotals = part.ratios.reduce((total, ratio) => total + ratio.ratio, 0)

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

	if (type === 'insight') {
		return (
			<div key={key} data-testid="message-content" className="flex flex-col gap-2">
				<h2 className="text-2xl font-semibold capitalize text-primary">Insight & Recommendation</h2>
				<div className="space-y-4 font-light">
					{part.text.map((markdown, index) => (
						<Markdown key={`part-${messageId}-markdown-${index}`}>{markdown}</Markdown>
					))}
				</div>
			</div>
		)
	}

	if (type === 'replies') {
		const copy = (line: string) => async () => {
			await copyToClipboard(line)
			toast.success('Reply copied to clipboard')
		}

		return (
			<div key={key} data-testid="message-content" className="flex flex-col gap-2 pb-4">
				<h2 className="text-2xl font-semibold capitalize text-primary">Reply Ideas</h2>
				<div className="space-y-4 font-light">
					{part.replies.map((reply, index) => (
						<div key={`reply-${reply.title}-${index}`} className="space-y-2">
							<h3 className="pt-2 text-lg font-semibold">{reply.title}</h3>
							{reply.lines.map((line, index) => (
								<div
									key={`reply-${line}-${index}`}
									className="flex items-start justify-start gap-2"
								>
									<div className="text-sm font-light">{line}</div>
									<Button
										variant="ghost"
										className="size-5 p-0 hover:bg-white hover:text-black"
										onClick={copy(line)}
									>
										<CopyIcon />
									</Button>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		)
	}
}
