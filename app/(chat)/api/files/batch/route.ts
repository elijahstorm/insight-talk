import { NextResponse } from 'next/server'
import { auth } from '@/app/(auth)/auth'
import {
	deleteTemporaryFilesById,
	getTemporaryFilesById,
	saveTemporaryFiles,
} from '@/lib/db/queries'
import { del } from '@vercel/blob'

export async function POST(request: Request) {
	const session = await auth()

	if (!session || !session.user || !session.user.id) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	try {
		const {
			files,
		}: {
			files: Array<string>
		} = await request.json()

		const batch = await saveTemporaryFiles({ files, userId: session.user.id })

		return NextResponse.json({ uuid: batch[0].id })
	} catch (error) {
		return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
	}
}

export async function GET(request: Request) {
	const session = await auth()

	if (!session || !session.user || !session.user.id) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const { searchParams } = new URL(request.url)
	const uuid = searchParams.get('uuid')

	if (!uuid) {
		return NextResponse.json({ error: 'UUID is required' }, { status: 400 })
	}

	try {
		const rows = await getTemporaryFilesById(uuid)

		if (!rows.length) {
			return NextResponse.json({ error: 'Batch Not Found' }, { status: 400 })
		}

		const temporaryFile = rows[0]

		if (temporaryFile.userId !== session.user.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
		}

		return NextResponse.json({ filepaths: temporaryFile.filepaths })
	} catch (error) {
		return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
	}
}

export async function DELETE(request: Request) {
	const session = await auth()

	if (!session || !session.user || !session.user.id) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const { searchParams } = new URL(request.url)
	const uuid = searchParams.get('uuid')

	if (!uuid) {
		return NextResponse.json({ error: 'UUID is required' }, { status: 400 })
	}

	try {
		const rows = await getTemporaryFilesById(uuid)

		if (!rows.length) {
			return NextResponse.json({ error: 'Batch Not Found' }, { status: 400 })
		}

		const temporaryFile = rows[0]

		if (temporaryFile.userId !== session.user.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
		}

		await Promise.all(
			temporaryFile.filepaths.map(async (filepath: string) => {
				try {
					await del(filepath)
				} catch (error) {
					console.error(`Failed to delete file at ${filepath}:`, error)
				}
			})
		)

		await deleteTemporaryFilesById(uuid)

		return NextResponse.json({ success: true })
	} catch (error) {
		return NextResponse.json({ error: 'Failed to delete batch' }, { status: 500 })
	}
}
