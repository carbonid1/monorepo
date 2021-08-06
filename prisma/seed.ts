import { PrismaClient } from '@prisma/client';
import mocks from '../mocks';
import fromUnixTime from 'date-fns/fromUnixTime';

const prisma = new PrismaClient();

const getDate = (timestamp: string | undefined | null): Date | undefined =>
  timestamp ? fromUnixTime(+timestamp / 1000) : undefined;

async function main() {
  const books = Object.values(mocks.books);
  for (const { authors, editions, publishedIn } of books) {
    await prisma.book.create({
      data: {
        publishedIn: getDate(publishedIn),
        authors: {
          connectOrCreate: authors.map(({ id, fullName, imageUrl }) => ({
            where: { id },
            create: { fullName, imageUrl },
          })),
        },
        editions: {
          create: editions.map(({ publishedIn, reviews, lang, description, title, cover }) => ({
            lang,
            description,
            title,
            cover,
            publishedIn: getDate(publishedIn),
            reviews: {
              create: reviews.map(({ lang, body, createdAt }) => ({
                lang,
                body,
                createdAt: getDate(createdAt),
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
