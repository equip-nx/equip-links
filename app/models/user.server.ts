import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type User = {
  name: string;
  email: string;
  domain: string;
  picture: string;
};

export async function findOrCreate(userProfile: User) {
  const user = await prisma.user.findFirst({
    where: {
      email: userProfile.email,
    },
  });

  if (user) {
    const updateUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        picture: user.picture,
      },
    });

    return updateUser;
  }

  return await prisma.user.create({
    data: userProfile,
  });
}
