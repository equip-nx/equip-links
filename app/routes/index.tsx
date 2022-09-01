import { useEffect, useRef } from 'react';
import { useFetcher } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import type { ActionFunction } from '@remix-run/node';

import { createLink } from '~/models/link.server';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const longUrl = formData.get("longUrl");
  const shortcode = formData.get("shortcode");

  if (!longUrl || !shortcode) {
    return redirect('/');
  }

  // @ts-ignore
  const newLink: any = await createLink({ shortcode, longUrl });

  if (newLink) {
    return json({ success: true, ...newLink });
  } else {
    return json({ success: false, error: newLink.error });
  }
};

export default function Index() {
  const link = useFetcher();
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (link) {
      form.current?.reset();
    }
  }, [link]);

  return (
    <main className="max-w-7xl mx-auto">
      <link.Form method="post" ref={form} className="flex flex-col gap-y-3">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Shortcode</label>
          <div className="mt-1">
            <input type="text" name="shortcode" id="shortcode" className="py-4 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-red-500 sm:text-sm" placeholder="you@example.com" />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">URL</label>
          <div className="mt-1">
            <input type="text" name="longUrl" id="longUrl" className="py-4 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-red-500 sm:text-sm" placeholder="you@example.com" />
          </div>
        </div>
        <div>
          <button type="submit" className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Create Link</button>
        </div>
      </link.Form>

      {link.type === "done" ? (
        link.data.success ? (
          <p>{link.data.shortUrl}</p>
        ) : link.data.error ? (
          <p data-error>{link.data.error}</p>
        ) : null
      ) : null}
    </main>
  );
}
