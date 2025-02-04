/*
  Warnings:

  - Added the required column `expiresAt` to the `WorkspaceInvitation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkspaceInvitation" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
