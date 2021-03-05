/*
  Warnings:

  - You are about to drop the column `slug` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "slug";
