-- DropIndex
DROP INDEX "File_folderId_key";

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "uploadTime" SET DEFAULT CURRENT_TIMESTAMP;
