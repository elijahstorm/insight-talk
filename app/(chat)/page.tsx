import { cookies } from 'next/headers';

import { generateUUID } from '@/lib/utils';
import Link from 'next/link';

export default async function Page() {
  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('chat-model');

  return (
    <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
    <h2 className="text-xl font-bold">
      Talk Insight
    </h2>
    <p>
      You can learn more about how to use the Talk Insight AI by visiting the{' '}
      <Link
        className="font-medium underline underline-offset-4"
        href="https://insight-talk.vercel.app/about"
        target="_blank"
      >
        about
      </Link>
      {' '}page.
    </p>
  </div>
  );
}
