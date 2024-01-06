import { useEffect, useRef } from 'react';
import { json, redirect } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';

import { authenticator } from '~/services/auth.server';
import { Input, Links, Button, Header } from '~/components';
import { createLink, findAllLinks } from '~/models/link.server';

export const loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (user) {
    const links = await findAllLinks();

    return json({
      user,
      links,
      appUrl: process.env.APP_URL
    });
  } else {
    return redirect('/login')
  }
}

export const action: ActionFunction = async ({ request }) => {
  // @ts-ignore
  let user: User = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const form = await request.formData();
  const longUrl = form.get("longUrl");
  const proposedShortcode = form.get("shortcode");


  if (!longUrl) {
    return json({
      success: false,
      error: 'You must fill out the url.'
    });
  }

  try {
    const newLink = await createLink({
      userId: user.id,
      // @ts-ignore
      longUrl,
      // @ts-ignore
      proposedShortcode
    });

    if (newLink.error) {
      return json({ success: false, error: newLink.error });
    } else {
      const links = await findAllLinks();
      return json({ success: true, links });
    }
  } catch (error: any) {
    console.error(error)
    return json({ success: false, error: error });
  }
};

export default function Index() {
  const form = useFetcher();
  const data = useLoaderData();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (form.data && !form.data.error) {
      formRef.current?.reset();
    }
  }, [form]);

  return (
    <div>
      <Header user={data.user} />
      <main className="px-2 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8">
        <form.Form method="post" ref={formRef} className="flex-col space-y-3 items-center sm:flex sm:flex-row sm:gap-x-3 sm:space-y-0">
          <div className="flex-1">
            <Input type='text' name='longUrl' label="Website" placeholder='equipnx.com' />
          </div>
          <div>
            <Input type='text' name='shortcode' label="Shortcode (optional)" placeholder='code' />
          </div>
          <div>
            <Button type="submit" label='Create Link' />
          </div>
        </form.Form>

        <Links links={data.links} />
      </main >
    </div>
  );
}
