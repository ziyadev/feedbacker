import { WorkspaceMemberRole } from '@/modules/workspace/model/workspace-member.model';
import {
  rand,
  randEmail,
  randFullName,
  randJobDescriptor,
  randSlug,
} from '@ngneat/falso';
import { PrismaClient } from '@prisma/client';
export default async function workspaceSeed(prisma: PrismaClient) {
  const users = await prisma.user.findMany();
  users.forEach(async (user) => {
    const workspace = await prisma.workspace.create({
      data: {
        name: randFullName(),
        owner: {
          connect: {
            id: user.id,
          },
        },
        slug: randSlug(),
        description: randJobDescriptor(),
      },
    });
    await prisma.workspaceMember.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        workspace: {
          connect: {
            id: workspace.id,
          },
        },
        role: WorkspaceMemberRole.ADMIN,
      },
    });
    await prisma.workspaceInvitation.create({
      data: {
        workspace: {
          connect: {
            id: workspace.id,
          },
        },
        role: rand([
          WorkspaceMemberRole.VIEWER,
          WorkspaceMemberRole.ADMIN,
          WorkspaceMemberRole.EDITOR,
        ]),
        email: randEmail(),
        expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
      },
    });
  });
}
