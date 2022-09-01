import type { Link } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type NewLink = {
  longUrl: string;
  shortcode: string;
};

export async function findLink(id: string | null): Promise<Link | null> {
  if (id) {
    // @ts-ignore
    if (isNaN(id)) {
      return null;
    }

    return prisma.link.findFirst({ where: { id: parseInt(id) } });
  }

  return null;
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
