/*
  Warnings:

  - You are about to drop the column `author` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "author",
ADD COLUMN     "authorId" INTEGER;

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Book" ADD FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE SET NULL ON UPDATE CASCADE;
