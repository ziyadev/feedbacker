/*
  Warnings:

  - You are about to drop the column `userId` on the `WorkspaceInvitation` table. All the data in the column will be lost.
  - Added the required column `email` to the `WorkspaceInvitation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "WorkspaceInvitation_userId_idx";

-- AlterTable
ALTER TABLE "WorkspaceInvitation" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "WorkspaceInvitation_email_idx" ON "WorkspaceInvitation"("email");
