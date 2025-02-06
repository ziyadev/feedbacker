import { PrismaClient } from '@prisma/client';
import feedbackSeed from './seeds/feedback-seed';
import userSeed from './seeds/user-seed';
import workspaceSeed from './seeds/workspace-seed';
async function main() {
  const prisma = new PrismaClient({
    log: ['info',"error","info"],

  });
  console.log("Generating Seed...");
  console.log("Generating userSeed")
  await userSeed(prisma);
  console.log("Generating workspaceSeed")
  await workspaceSeed(prisma);
  console.log("Generating feedbackSeed")
  await feedbackSeed(prisma);
}
main().catch((err) => {
  console.warn('Error While generating Seed: \n', err);
});
