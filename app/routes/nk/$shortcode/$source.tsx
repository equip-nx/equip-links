import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { findLink, incrementClickCount, incrementVisitCount } from '~/models/link.server';

const SOURCES = {
  x: { source: 'x', medium: 'social' },
  f: { source: 'facebook', medium: 'social' },
  l: { source: 'linkedin', medium: 'social' },
  i: { source: 'instagram', medium: 'social' }
}

function constructUrlWithUtm(link: any, sourceData: { source: string; medium: string }, useDefault: boolean): string {
  const createdAt = new Date(link.createdAt);
  const formattedDate = `${createdAt.getFullYear()}${(createdAt.getMonth() + 1).toString().padStart(2, '0')}${createdAt.getDate().toString().padStart(2, '0')}`;

  const utmSource = useDefault ? 'default_source' : sourceData.source;
  const utmMedium = useDefault ? 'default_medium' : sourceData.medium;

  const separator = link.longUrl.includes('?') ? '&' : '?';
  return `${link.longUrl}${separator}ref=equip&utm_source=${utmSource}&utm_medium=${utmMedium}&utm_content=${formattedDate}`;
}

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.shortcode) {
    return null;
  }

  const link = await findLink(params.shortcode)

  const sourceKey = params.source as keyof typeof SOURCES;
  if (sourceKey && sourceKey in SOURCES) {
    const sourceData = SOURCES[sourceKey];

    if (link) {
      await incrementClickCount(link.id);
      await incrementVisitCount(link.id, sourceData.source);
      const url = constructUrlWithUtm(link, sourceData, false);
      return redirect(url);
    } else {
      return redirect('https://equipnx.com');
    }
  } else {
    if (link) {
      await incrementClickCount(link.id);
      const url = constructUrlWithUtm(link, { source: '', medium: '' }, true);
      return redirect(url);
    } else {
      return redirect('https://equipnx.com');
    }
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

