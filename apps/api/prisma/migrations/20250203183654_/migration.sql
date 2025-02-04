/*
  Warnings:

  - The values [member] on the enum `WorkspaceMemberRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `permissions` on the `WorkspaceMember` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "WorkspaceMemberRole_new" AS ENUM ('admin', 'editor', 'viewer');
ALTER TABLE "WorkspaceMember" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "WorkspaceMember" ALTER COLUMN "role" TYPE "WorkspaceMemberRole_new" USING ("role"::text::"WorkspaceMemberRole_new");
ALTER TYPE "WorkspaceMemberRole" RENAME TO "WorkspaceMemberRole_old";
ALTER TYPE "WorkspaceMemberRole_new" RENAME TO "WorkspaceMemberRole";
DROP TYPE "WorkspaceMemberRole_old";
ALTER TABLE "WorkspaceMember" ALTER COLUMN "role" SET DEFAULT 'viewer';
COMMIT;

-- AlterTable
ALTER TABLE "WorkspaceMember" DROP COLUMN "permissions",
ALTER COLUMN "role" SET DEFAULT 'viewer';
