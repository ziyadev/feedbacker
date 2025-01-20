/*
  Warnings:

  - The `type` column on the `Account` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('OAUTH');

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "type",
ADD COLUMN     "type" "AccountType" NOT NULL DEFAULT 'OAUTH';
