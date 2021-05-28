import { PrismaClient } from '@prisma/client';
import mocks from '../mocks';

const prisma = new PrismaClient();
// const { authors, editions } = mocks;

// async function main() {
//   await prisma.book.create({
//     data: {
//       authors: {
//         connectOrCreate: [{ where: { id: 2 }, create: { fullName: 'George R.R. Martin' } }],
//       },
//       publishedIn: new Date('1996-08-06'),
//       editions: {
//         create: {
//           lang: 'en',
//           description: `Long ago, in a time forgotten, a preternatural event threw the seasons out of balance. In a land where summers can last decades and winters a lifetime, trouble is brewing. The cold is returning, and in the frozen wastes to the north of Winterfell, sinister and supernatural forces are massing beyond the kingdom’s protective Wall. At the center of the conflict lie the Starks of Winterfell, a family as harsh and unyielding as the land they were born to. Sweeping from a land of brutal cold to a distant summertime kingdom of epicurean plenty, here is a tale of lords and ladies, soldiers and sorcerers, assassins and bastards, who come together in a time of grim omens.
//           Here an enigmatic band of warriors bear swords of no human metal; a tribe of fierce wildlings carry men off into madness; a cruel young dragon prince barters his sister to win back his throne; and a determined woman undertakes the most treacherous of journeys. Amid plots and counterplots, tragedy and betrayal, victory and terror, the fate of the Starks, their allies, and their enemies hangs perilously in the balance, as each endeavors to win that deadliest of conflicts: the game of thrones.`,
//           publishedIn: new Date('2005-08'),
//           title: 'A Game of Thrones',
//           cover: 'https://res.cloudinary.com/book-hub/image/upload/v1621965264/covers/sm/13496_lmqry2.jpg',
//         },
//       },
//     },
//   });

//   await prisma.book.create({
//     data: {
//       authors: {
//         connectOrCreate: [
//           { where: { id: 3 }, create: { fullName: 'Terry Pratchett' } },
//           { where: { id: 4 }, create: { fullName: 'Stephen Baxter' } },
//         ],
//       },
//       publishedIn: new Date('2014-06-19'),
//       editions: {
//         create: {
//           lang: 'en',
//           description: `The third novel in Terry Pratchett and Stephen Baxter’s “Long Earth” series, which Io9 calls “a brilliant science fiction collaboration.”
//           2040-2045: In the years after the cataclysmic Yellowstone eruption there is massive economic dislocation as populations flee Datum Earth to myriad Long Earth worlds. Sally, Joshua, and Lobsang are all involved in this perilous rescue work when, out of the blue, Sally is contacted by her long-vanished father and inventor of the original Stepper device, Willis Linsay. He tells her he is planning a fantastic voyage across the Long Mars and wants her to accompany him. But Sally soon learns that Willis has an ulterior motive for his request. . . .
//           Meanwhile U. S. Navy Commander Maggie Kauffman has embarked on an incredible journey of her own, leading an expedition to the outer limits of the far Long Earth.
//           For Joshua, the crisis he faces is much closer to home. He becomes embroiled in the plight of the Next: the super-bright post-humans who are beginning to emerge from their “long childhood” in the community called Happy Landings, located deep in the Long Earth. Ignorance and fear have caused “normal” human society to turn against the Next. A dramatic showdown seems inevitable. . . . `,
//           publishedIn: new Date('2014-06-19'),
//           title: 'The Long Mars',
//           cover: 'https://res.cloudinary.com/book-hub/image/upload/v1621965325/covers/sm/18586487_gk7e1k.jpg',
//         },
//       },
//     },
//   });

//   await prisma.book.create({
//     data: {
//       publishedIn: new Date('800'),
//       editions: {
//         create: {
//           lang: 'en',
//           description: `The vengeful King Schahriar agrees to stave off the execution of Queen Scheherazade until she finishes a particularly compelling story. Her plan? Bleed one tale into another. Through fanciful histories, romances, tragedies, comedies, poems, riddles, and songs, Scheherazade prolongs her life by holding the king’s rapt attention. With origins in Persian and Eastern Indian folklore, the stories of The Arabian Nights have been reworked, reshaped, revised, collected, and supplemented throughout the centuries by various authors and scholars - and are continually redefined by the modern translations of the Western world.`,
//           publishedIn: new Date('2004-06'),
//           title: 'The Arabian Nights',
//           cover: 'https://res.cloudinary.com/book-hub/image/upload/v1621965401/covers/sm/93101._SY475__adpv95.jpg',
//         },
//       },
//     },
//   });
// }

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
