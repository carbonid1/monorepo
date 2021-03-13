/*
  Warnings:

  - You are about to drop the column `bookId` on the `Review` table. All the data in the column will be lost.
  - Added the required column `editionId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_bookId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "bookId",
ADD COLUMN     "editionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD FOREIGN KEY ("editionId") REFERENCES "Edition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
