import type { Link } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type NewLink = {
  longUrl: string;
  shortcode: string;
};

export async function findLink(shortcode: string): Promise<Link | null> {
  const link = await prisma.link.findFirst({ where: { shortcode } });
  return link;
}

export async function incrementClickCount(id: number) {
  await prisma.link.update({
    where: { id },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });
}

export async function createLink(link: NewLink) {
  const currentLink = await prisma.link.findFirst({
    where: { shortcode: link.shortcode },
  });

  if (currentLink) {
    return { error: 'A link with that shortcode already exists.' };
  }

  const shortUrl = `${process.env.APP_URL}/${link.shortcode}`;
  const protocol = link.longUrl.match(/https?:\/\//);

  if (!protocol) {
    link.longUrl = `https://${link.longUrl}`;
  }

  return prisma.link.create({ data: { ...link, shortUrl } });
}
