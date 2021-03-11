/*
  Warnings:

  - The `publishedIn` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `publishedIn` column on the `Edition` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "publishedIn",
ADD COLUMN     "publishedIn" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Edition" DROP COLUMN "publishedIn",
ADD COLUMN     "publishedIn" TIMESTAMP(3);
