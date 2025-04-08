import Form from 'next/form'

import { signOut } from '@/app/(auth)/auth'
import { useLanguage } from '@/hooks/use-language'
import { dictionary } from '@/lib/language/dictionary'

export const SignOutForm = () => {
	const { currentLanguage } = useLanguage()

	return (
		<Form
			className="w-full"
			action={async () => {
				'use server'

				await signOut({
					redirectTo: '/',
				})
			}}
		>
			<button type="submit" className="w-full px-1 py-0.5 text-left text-red-500">
				{dictionary.sidebar.actions.signOut[currentLanguage.code]}
			</button>
		</Form>
	)
}
