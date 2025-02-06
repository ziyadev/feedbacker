/*
  Warnings:

  - The values [MEDIUM] on the enum `FeedbackPriority` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `FeedbackTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FeedbackToFeedbackTag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FeedbackType" AS ENUM ('BUG', 'FEATURE', 'QUESTION', 'GENERAL');

-- AlterEnum
BEGIN;
CREATE TYPE "FeedbackPriority_new" AS ENUM ('URGRGENT', 'HIGH', 'NEUTRAL', 'LOW');
ALTER TABLE "Feedback" ALTER COLUMN "priority" TYPE "FeedbackPriority_new" USING ("priority"::text::"FeedbackPriority_new");
ALTER TYPE "FeedbackPriority" RENAME TO "FeedbackPriority_old";
ALTER TYPE "FeedbackPriority_new" RENAME TO "FeedbackPriority";
DROP TYPE "FeedbackPriority_old";
COMMIT;

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "type" "FeedbackType" NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL;

-- DropTable
DROP TABLE "FeedbackTag";

-- DropTable
DROP TABLE "_FeedbackToFeedbackTag";
