import { Plus } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { json, redirect } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';

import { authenticator } from '~/services/auth.server';
import { Links, Header } from '~/components';
import { createLink, findAllLinks } from '~/models/link.server';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

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
      <main className="px-2 mx-auto mt-4 max-w-7xl sm:px-6 lg:px-8">
        <form.Form method="post" ref={formRef} className="flex-col space-y-3 items-center sm:flex sm:flex-row sm:gap-x-3 sm:space-y-0">
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-sm" htmlFor="website">Website</Label>
            <Input name="longUrl" type="text" id="website" placeholder="equipnx.com" className='bg-white h-10' />
          </div>
          <div className="grid w-full items-center gap-1.5 sm:max-w-40">
            <Label className="text-sm" htmlFor="shortcode">Shortcode (optional)</Label>
            <Input name="shortcode" type="text" id="shortcode" placeholder="code" className='bg-white h-10' />
          </div>
          <div className="sm:pt-6">
            <Button className="w-full sm:w-auto">
              <Plus /> Create Link
            </Button>
          </div>
        </form.Form>

        <Links links={data.links} />
      </main>
    </div>
  );
}
