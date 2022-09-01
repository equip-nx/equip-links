import { json } from '@remix-run/node';
import { useEffect, useRef } from 'react';
import { useFetcher, useLoaderData } from '@remix-run/react';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';

import Input from '~/components/input';
import Label from '~/components/label';
import Button from '~/components/button';
import { createLink } from '~/models/link.server';

export const loader: LoaderFunction = async () => {
  return json({
    appUrl: process.env.APP_URL
  })
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const longUrl = form.get("longUrl");
  const proposedShortcode = form.get("shortcode");

  if (!longUrl) {
    return json({ success: false, error: 'You must fill out the url.' });
  }

  // @ts-ignore
  const newLink = await createLink({ longUrl, proposedShortcode });

  if (newLink.error) {
    return json({ success: false, error: newLink.error });
  } else {
    return json({ success: true, ...newLink });
  }
};

export default function Index() {
  const link = useFetcher();
  const data = useLoaderData();
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (link.data && !link.data.error) {
      form.current?.reset();
    }
  }, [link]);

  return (
    <main className="max-w-7xl mx-auto mt-20">
      <link.Form method="post" ref={form} className="flex flex-col gap-y-3">
        <div>
          <Label htmlFor="longUrl" value="URL" />
          <Input type='text' name='longUrl' placeholder='google.com' />
        </div>
        <div>
          <Label htmlFor="shortcode" value="Shortcode (optional)" />
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm tracking-wide">{data.appUrl}/</span>
            </div>
            <Input
              type='text'
              name='shortcode'
              placeholder='code'
              className='py-4 px-3 pl-32 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-red-500 sm:text-sm'
            />
          </div>
        </div>
        <div>
          <Button type="submit" label='Create Link' />
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
