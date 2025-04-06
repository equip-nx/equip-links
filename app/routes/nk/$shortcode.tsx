import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { findLink, incrementClickCount } from '~/models/link.server';

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.shortcode) {
    return null;
  }

  if (params.source) {
    return null;
  }

  const link = await findLink(params.shortcode)

  if (link) {
    await incrementClickCount(link.id);
    return redirect(link.longUrl);
  } else {
    return redirect('https://equipnx.com');
  }
};

export default function Shortcode() {
  const linkJson = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>{linkJson.error}</h1>
    </div>
  );
}
