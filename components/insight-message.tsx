import { UIMessage } from 'ai'
import { Markdown } from './markdown'
import { MessageReasoning } from './message-reasoning'

type Reasoning = UIMessage['parts'][number]
type InsightPart = {
	type: 'text'
	text: string
}

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
	parts: Array<InsightPart>
	experimental_attachments?: UIMessage['experimental_attachments']
}

export default function InsightMessage({
	part,
	index,
	messageId,
}: {
	part: InsightPart
	index: number
	messageId: string
	isLoading: boolean
}) {
	const { type } = part
	const key = `message-${messageId}-part-${index}`

	if (type === 'text') {
		return (
			<div key={key} className="flex flex-row items-start gap-2">
				<div data-testid="message-content" className="flex flex-col gap-4">
					<Markdown>{part.text}</Markdown>
				</div>
			</div>
		)
	}
}
