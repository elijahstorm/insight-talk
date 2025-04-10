import { UIMessage } from 'ai'
import { Markdown } from '@/components/markdown'
import { useCopyToClipboard } from 'usehooks-ts'
import { toast } from 'sonner'
import { CopyIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { dictionary } from '@/lib/language/dictionary'
import { useLanguage } from '@/hooks/use-language'

type ChatLogs = {
	type: 'chat-logs'
	logs: string
}

type CommunicationPatternPart = {
	type: 'com-pattern'
	people: Array<{
		name: string
		style: string
		text: string
		ratios: Array<{
			type: string
			ratio: number
		}>
		description: Array<string>
	}>
}

type InsightPart = {
	type: 'insight'
	text: Array<string>
}

type PotentialConflictTriggersPart = {
	type: 'triggers'
	triggers: Array<string>
	insight: string
}

type RepliesPart = {
	type: 'replies'
	replies: Array<{
		title: string
		lines: Array<string>
	}>
}

export type InsightParts =
	| ChatLogs
	| CommunicationPatternPart
	| InsightPart
	| RepliesPart
	| PotentialConflictTriggersPart

export const chatLogsType = 'chat-logs'
export const insightTypes = ['com-pattern', 'insight', 'replies', 'triggers']

export function isInsightMessageType(
	message: UIMessage | InsightMessageType
): message is InsightMessageType {
	return (message as InsightMessageType).insight === true
}

export type InsightMessageType = {
	id: string
	insight: true
	role: 'assistant'
	createdAt: Date
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
	const { currentLanguage } = useLanguage()

	const { type } = part
	const key = `message-${messageId}-part-${index}`
	const colors = ['secondary', 'accent', 'primary', 'muted']

	if (type === 'com-pattern') {
		return (
			<div key={key} data-testid="message-content" className="space-y-6 divide-y-2">
				{part.people.map((person, personIndex) => {
					const ratioTotals = person.ratios.reduce((total, ratio) => total + ratio.ratio, 0)
					return (
						<div
							key={`part-person-${personIndex}`}
							className={`flex flex-col gap-2 ${personIndex > 0 ? 'pt-6' : ''}`}
						>
							<p className="font-light text-foreground">
								<span className="font-semibold text-secondary">{person.name}&rsquo;s</span>
								&nbsp;
								{dictionary.messages.analysis.comPattern[currentLanguage.code]}
							</p>
							<h2 className="text-3xl font-bold capitalize text-primary dark:text-accent">
								{person.style}
							</h2>
							<p className="font-light">{person.text}</p>
							<div className="flex w-full py-4 text-lg font-semibold capitalize">
								{person.ratios.map((ratio, index) => (
									<div
										key={`part-${messageId}-person-${personIndex}-ratio-${index}`}
										className={`bg-${colors[index % colors.length]} text-${colors[index % colors.length]}-foreground space-x-1 truncate px-1 py-2 text-center text-xs sm:text-sm md:text-lg`}
										style={{ width: `${(ratio.ratio / ratioTotals) * 100}%` }}
										title={ratio.type}
									>
										<span>{ratio.type}</span>
										{index !== person.ratios.length - 1 && (
											<span>{Math.round((ratio.ratio / ratioTotals) * 10000) / 100}%</span>
										)}
									</div>
								))}
							</div>
							<div className="font-light">
								{person.description.map((markdown, index) => (
									<Markdown key={`part-${messageId}-person-${personIndex}-markdown-${index}`}>
										{markdown}
									</Markdown>
								))}
							</div>
						</div>
					)
				})}
			</div>
		)
	}

	if (type === 'insight') {
		return (
			<div key={key} data-testid="message-content" className="flex flex-col gap-2">
				<h2 className="text-2xl font-semibold capitalize text-primary dark:text-accent">
					{dictionary.messages.analysis.insightAndRec[currentLanguage.code]}
				</h2>
				<div className="space-y-4 font-light">
					<Markdown className="[&>*]:mb-4 [&_*_li]:list-disc">{part.text.join('\n\n')}</Markdown>
				</div>
			</div>
		)
	}

	if (type === 'triggers') {
		return (
			<div key={key} data-testid="message-content" className="flex flex-col gap-2">
				<h2 className="text-2xl font-semibold capitalize text-primary dark:text-accent">
					{dictionary.messages.analysis.potentialTriggers.title[currentLanguage.code]}
				</h2>
				<div className="space-y-4 font-light">
					<p>{dictionary.messages.analysis.potentialTriggers.information[currentLanguage.code]}</p>
					<Markdown className="[&>*]:mb-4 [&_*_li]:list-disc">
						{part.triggers?.join('\n * ')}
					</Markdown>
					<Markdown>{part.insight}</Markdown>
				</div>
			</div>
		)
	}

	if (type === 'replies') {
		const copy = (line: string) => async () => {
			await copyToClipboard(line)
			toast.success(dictionary.messages.navigation.toasts.reply.copied[currentLanguage.code])
		}

		return (
			<div key={key} data-testid="message-content" className="flex flex-col gap-2 pb-4">
				<h2 className="text-2xl font-semibold capitalize text-primary dark:text-accent">
					{dictionary.messages.analysis.replyIdeas[currentLanguage.code]}
				</h2>
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
										className="size-5 p-0 hover:bg-background hover:text-foreground"
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
