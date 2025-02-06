/*
  Warnings:

  - Added the required column `country` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageUrl` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FeedbackPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "FeedbackStatus" AS ENUM ('OPEN', 'CLOSED', 'IN_QA', 'TODO', 'BACKLOG', 'RESOLVED');

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "assignedToId" TEXT,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "feedbackNoteId" TEXT,
ADD COLUMN     "feedbackViewId" TEXT,
ADD COLUMN     "pageUrl" TEXT NOT NULL,
ADD COLUMN     "priority" "FeedbackPriority" NOT NULL,
ADD COLUMN     "status" "FeedbackStatus" NOT NULL,
ADD COLUMN     "summary" TEXT,
ADD COLUMN     "userMetadata" JSONB;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "feedbackId" TEXT,
ALTER COLUMN "workspaceId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "FeedbackCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FeedbackCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FeedbackTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackView" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedbackView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackNote" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FeedbackNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FeedbackToFeedbackCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FeedbackToFeedbackCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FeedbackToFeedbackTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FeedbackToFeedbackTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "FeedbackView_memberId_idx" ON "FeedbackView"("memberId");

-- CreateIndex
CREATE INDEX "_FeedbackToFeedbackCategory_B_index" ON "_FeedbackToFeedbackCategory"("B");

-- CreateIndex
CREATE INDEX "_FeedbackToFeedbackTag_B_index" ON "_FeedbackToFeedbackTag"("B");

-- CreateIndex
CREATE INDEX "Feedback_feedbackViewId_idx" ON "Feedback"("feedbackViewId");

-- CreateIndex
CREATE INDEX "Feedback_feedbackNoteId_idx" ON "Feedback"("feedbackNoteId");

-- CreateIndex
CREATE INDEX "Feedback_assignedToId_idx" ON "Feedback"("assignedToId");

-- CreateIndex
CREATE INDEX "Media_feedbackId_idx" ON "Media"("feedbackId");
