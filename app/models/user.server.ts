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
    return user;
  }

  return await prisma.user.create({
    data: userProfile,
  });
}
