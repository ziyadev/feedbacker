import {
    rand,
    randEmail,
    randFullName,
    randJobDescriptor,
    randSlug,
} from '@ngneat/falso';
import { PrismaClient, WorkspaceMemberRole } from '@prisma/client';
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
        role: WorkspaceMemberRole.admin,
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
          WorkspaceMemberRole.viewer,
          WorkspaceMemberRole.admin,
          WorkspaceMemberRole.editor,
        ]),
        email: randEmail(),
        expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
      },
    });
  });
}
