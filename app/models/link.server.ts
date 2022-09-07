import { nanoid } from 'nanoid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const generateShortcode = (length?: number) => {
  return nanoid(length);
};

export async function findAllLinks() {
  return await prisma.link.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

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

export async function createLink({
  userId,
  longUrl,
  proposedShortcode,
}: {
  userId: number;
  longUrl: string;
  proposedShortcode?: string | null;
}) {
  console.log('createLink 1');

  let shortcode = proposedShortcode || generateShortcode(6);

  console.log('createLink 2', shortcode);

  if (proposedShortcode) {
    console.log('proposedShortcode 3', proposedShortcode);

    const currentLink = await prisma.link.findFirst({
      where: { shortcode: proposedShortcode },
    });

    console.log('currentLink 4', currentLink?.shortUrl);

    if (currentLink) {
      console.log('currentLink 5', currentLink?.shortUrl);

      return {
        ...currentLink,
        error: 'A link with that shortcode already exists.',
      };
    }
  }

  console.log('createLink 6');

  const shortUrl = `${process.env.APP_URL}/nk/${shortcode}`;
  const protocol = longUrl.match(/https?:\/\//);

  console.log('createLink 7');

  if (!protocol) {
    longUrl = `https://${longUrl}`;
    console.log('protocol 8', longUrl);
  }

  console.log('createLink 9');

  const newLink = prisma.link.create({
    data: {
      shortcode,
      longUrl,
      shortUrl,
      creator: { connect: { id: userId } },
    },
  });

  console.log('createLink 10');

  return { ...newLink, error: null };
}
