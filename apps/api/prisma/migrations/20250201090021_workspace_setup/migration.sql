-- CreateEnum
CREATE TYPE "WorkspaceMemberRole" AS ENUM ('member', 'admin');

-- CreateEnum
CREATE TYPE "WorkspaceInvitationStatus" AS ENUM ('pending', 'accepted', 'rejected');

-- AlterTable
ALTER TABLE "WorkspaceMember" ADD COLUMN     "role" "WorkspaceMemberRole" NOT NULL DEFAULT 'member';

-- CreateTable
CREATE TABLE "WorkspaceInvitation" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "status" "WorkspaceInvitationStatus" NOT NULL DEFAULT 'pending',
    "userId" TEXT NOT NULL,

    CONSTRAINT "WorkspaceInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WorkspaceInvitation_workspaceId_idx" ON "WorkspaceInvitation"("workspaceId");

-- CreateIndex
CREATE INDEX "WorkspaceInvitation_userId_idx" ON "WorkspaceInvitation"("userId");
