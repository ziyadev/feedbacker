-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "priority" SET DEFAULT 'low',
ALTER COLUMN "status" SET DEFAULT 'open',
ALTER COLUMN "type" SET DEFAULT 'general';

-- DropEnum
DROP TYPE "FeedbackPriority";

-- DropEnum
DROP TYPE "FeedbackStatus";

-- DropEnum
DROP TYPE "FeedbackType";
