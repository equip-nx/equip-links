import { nanoid } from 'nanoid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const generateShortcode = (length?: number) => {
  return nanoid(length);
};

export async function findAllLinks() {
  return await prisma.link.findMany({
    include: {
      linkVisits: true,
    },
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
      visits: {
        increment: 1,
      },
    },
  });
}

export async function incrementVisitCount(linkId: number, source: string) {
  await prisma.linkVisit.upsert({
    where: {
      linkId_source: {
        linkId,
        source,
      },
    },
    update: {
      visits: {
        increment: 1,
      },
    },
    create: {
      linkId,
      source,
      visits: 1,
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
  let shortcode = proposedShortcode || generateShortcode(6);

  if (proposedShortcode) {
    const currentLink = await prisma.link.findFirst({
      where: { shortcode: proposedShortcode },
    });

    if (currentLink) {
      return {
        ...currentLink,
        error: 'A link with that shortcode already exists.',
      };
    }
  }

  const shortUrl = `${process.env.APP_URL}/nk/${shortcode}`;
  const protocol = longUrl.match(/https?:\/\//);

  if (!protocol) {
    longUrl = `https://${longUrl}`;
  }

  const newLink = prisma.link.create({
    data: {
      shortcode,
      longUrl,
      shortUrl,
      creator: { connect: { id: userId } },
    },
  });

  return { ...newLink, error: null };
}
