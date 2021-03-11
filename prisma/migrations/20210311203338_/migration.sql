/*
  Warnings:

  - You are about to alter the column `fullName` on the `Author` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `title` on the `Edition` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Author" ALTER COLUMN "fullName" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Edition" ALTER COLUMN "title" SET DATA TYPE VARCHAR(255);
