import { PrismaClient } from '@prisma/client';
import mocks from '../mocks';

const prisma = new PrismaClient();

async function main() {
  const books = Object.values(mocks.books);
  for (const { authors, editions } of books) {
    await prisma.book.create({
      data: {
        publishedIn: new Date('2019-05-28'),
        authors: {
          connectOrCreate: authors.map(({ id, fullName }) => ({ where: { id }, create: { fullName } })),
        },
        editions: {
          create: editions.map(({ publishedIn, reviews, lang, description, title, cover }) => ({
            lang,
            description,
            title,
            cover,
            publishedIn: new Date('2020-11-18'),
            reviews: {
              create: reviews.map(({ lang, body }) => ({
                lang,
                body,
                createdAt: new Date('2021-02-24'),
              })),
            },
          })),
        },
      },
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
