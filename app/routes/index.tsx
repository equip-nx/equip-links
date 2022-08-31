import { json } from '@remix-run/node';
import { PrismaClient } from '@prisma/client'
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';

const prisma = new PrismaClient()

export const loader: LoaderFunction = async () => {
  const link = await prisma.link.create({
    data: {
      shortcode: 'hello',
      url: 'https://equipnx.com',
      clicks: 0,
    }
  })

  return json({
    id: link.id,
    shortcode: link.shortcode
  });
};

export default function Index() {
  const link = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <p>{link.shortcode}</p>
    </div>
  );
}
