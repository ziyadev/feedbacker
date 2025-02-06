import {
  randCompanyName,
  randCounty,
  randEmail,
  randFullName,
  randNumber,
} from '@ngneat/falso';
import { PrismaClient } from '@prisma/client';
import { passwordHash } from '../../src/modules/auth/utils/password-hash';
export default async function userSeed(prisma: PrismaClient) {
  const hashedPassword = await passwordHash('NewPassword123@.');
  Array.from({ length: 1000 }).forEach(async () => {
    await createUser(hashedPassword, prisma);
  });
}

async function createUser(hashedPassword: string, prisma: PrismaClient) {
  const user = await prisma.user.create({
    data: {
      name: randFullName(),
      email: randEmail(),
      hashedPassword,
    },
  });
  await prisma.userProfile.create({
    data: {
      teamSize: `from ${randNumber({
        min: 1,
        max: 10,
      })} to ${randNumber({
        min: 11,
        max: 20,
      })}`,
      country: randCounty(),
      companyKind: [randCompanyName(), randCompanyName()],
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

}
