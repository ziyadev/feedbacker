/*
  Warnings:

  - You are about to drop the column `feedbackViewId` on the `Feedback` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Feedback_feedbackViewId_idx";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "feedbackViewId";

-- CreateTable
CREATE TABLE "_FeedbackToFeedbackView" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FeedbackToFeedbackView_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FeedbackToFeedbackView_B_index" ON "_FeedbackToFeedbackView"("B");
