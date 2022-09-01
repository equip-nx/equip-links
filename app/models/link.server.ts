import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function findLink(shortcode: string) {
  return await prisma.link.findFirst({ where: { shortcode } });
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

export async function createLink(link: Link) {
  const currentLink = await prisma.link.findFirst({
    where: { shortcode: link.shortcode },
  });

  if (currentLink) {
    return {
      ...currentLink,
      error: 'A link with that shortcode already exists.',
    };
  }

  const shortUrl = `${process.env.APP_URL}/${link.shortcode}`;
  const protocol = link.longUrl.match(/https?:\/\//);

  if (!protocol) {
    link.longUrl = `https://${link.longUrl}`;
  }

  const newLink = prisma.link.create({ data: { ...link, shortUrl } });
  return { ...newLink, error: null };
}
