import { json, redirect } from '@remix-run/node';
import { PrismaClient } from '@prisma/client'
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';

const prisma = new PrismaClient()

export const loader: LoaderFunction = async ({ params }) => {
  const link = await prisma.link.findFirst({
    where: { shortcode: params.shortcode },
  });

  if (link) {
    return redirect(link.longUrl);
  } else {
    return json({
      error: 'Link not found...'
    })
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
