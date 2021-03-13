import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.book.create({
    data: {
      authors: {
        connectOrCreate: [{ where: { id: 1 }, create: { fullName: 'David Epstein' } }],
      },
      editions: {
        create: [
          {
            description: `What's the most effective path to success in any domain? It's not what you think. Plenty of experts argue that anyone who wants to develop a skill, play an instrument, or lead their field should start early, focus intensely, and rack up as many hours of deliberate practice as possible. If you dabble or delay, you'll never catch up to the people who got a head start. But a closer look at research on the world's top performers, from professional athletes to Nobel laureates, shows that early specialization is the exception, not the rule. David Epstein examined the world's most successful athletes, artists, musicians, inventors, forecasters and scientists. He discovered that in most fields--especially those that are complex and unpredictable--generalists, not specialists, are primed to excel. Generalists often find their path late, and they juggle many interests rather than focusing on one. They're also more creative, more agile, and able to make connections their more specialized peers can't see. Provocative, rigorous, and engrossing, Range makes a compelling case for actively cultivating inefficiency. Failing a test is the best way to learn. Frequent quitters end up with the most fulfilling careers. The most impactful inventors cross domains rather than deepening their knowledge in a single area. As experts silo themselves further while computers master more of the skills once reserved for highly focused humans, people who think broadly and embrace diverse experiences and perspectives will increasingly thrive.`,
            publishedIn: new Date('2019-05-28'),
            reviews: {
              create: {
                body: `This book looks at how an emphasis on specialization can actually hamper our ability to really excel at something. It aligns with what I try to do when I am coaching, in my stories, and what we’re doing with Mamba Sports Academy—create all-around athletes who can think critically and make assessments in real time to enhance their play rather than rely only on a narrow set of skills.`,
              },
            },
            title: 'Range: Why Generalists Triumph in a Specialized World',
          },
          {
            description: `Эта книга перевернет ваши представления о пути к профессиональному успеху! Революционный подход Дэвида Эпштейна, магистра экологических наук и журналистики, ставит под сомнение идею 10 000 часов. Он исследовал примеры самых успешных спортсменов, художников, музыкантов, нобелевских лауреатов и ученых и обнаружил, что в большинстве областей ранняя и узкая специализация – не синоним результата. Именно универсалы — изобретательные и гибкие люди с широким кругозором и большим жизненным опытом — рулят в мире больших скоростей.`,
            publishedIn: new Date('2020-11-18'),
            title: 'Универсалы. Как талантливые дилетанты становятся победителями по жизни',
          },
        ],
      },
      publishedIn: new Date('2019-05-28'),
    },
  });

  await prisma.book.create({
    data: {
      authors: {
        connectOrCreate: [{ where: { id: 2 }, create: { fullName: 'George R.R. Martin' } }],
      },
      publishedIn: new Date('1996-08-06'),
      editions: {
        create: {
          description: `Long ago, in a time forgotten, a preternatural event threw the seasons out of balance. In a land where summers can last decades and winters a lifetime, trouble is brewing. The cold is returning, and in the frozen wastes to the north of Winterfell, sinister and supernatural forces are massing beyond the kingdom’s protective Wall. At the center of the conflict lie the Starks of Winterfell, a family as harsh and unyielding as the land they were born to. Sweeping from a land of brutal cold to a distant summertime kingdom of epicurean plenty, here is a tale of lords and ladies, soldiers and sorcerers, assassins and bastards, who come together in a time of grim omens.
          Here an enigmatic band of warriors bear swords of no human metal; a tribe of fierce wildlings carry men off into madness; a cruel young dragon prince barters his sister to win back his throne; and a determined woman undertakes the most treacherous of journeys. Amid plots and counterplots, tragedy and betrayal, victory and terror, the fate of the Starks, their allies, and their enemies hangs perilously in the balance, as each endeavors to win that deadliest of conflicts: the game of thrones.`,
          publishedIn: new Date('2005-08'),
          title: 'A Game of Thrones',
        },
      },
    },
  });

  await prisma.book.create({
    data: {
      authors: {
        connectOrCreate: [
          { where: { id: 3 }, create: { fullName: 'Terry Pratchett' } },
          { where: { id: 4 }, create: { fullName: 'Stephen Baxter' } },
        ],
      },
      publishedIn: new Date('2014-06-19'),
      editions: {
        create: {
          description: `The third novel in Terry Pratchett and Stephen Baxter’s “Long Earth” series, which Io9 calls “a brilliant science fiction collaboration.”
          2040-2045: In the years after the cataclysmic Yellowstone eruption there is massive economic dislocation as populations flee Datum Earth to myriad Long Earth worlds. Sally, Joshua, and Lobsang are all involved in this perilous rescue work when, out of the blue, Sally is contacted by her long-vanished father and inventor of the original Stepper device, Willis Linsay. He tells her he is planning a fantastic voyage across the Long Mars and wants her to accompany him. But Sally soon learns that Willis has an ulterior motive for his request. . . .
          Meanwhile U. S. Navy Commander Maggie Kauffman has embarked on an incredible journey of her own, leading an expedition to the outer limits of the far Long Earth.
          For Joshua, the crisis he faces is much closer to home. He becomes embroiled in the plight of the Next: the super-bright post-humans who are beginning to emerge from their “long childhood” in the community called Happy Landings, located deep in the Long Earth. Ignorance and fear have caused “normal” human society to turn against the Next. A dramatic showdown seems inevitable. . . . `,
          publishedIn: new Date('2014-06-19'),
          title: 'The Long Mars',
        },
      },
    },
  });

  await prisma.book.create({
    data: {
      publishedIn: new Date('800'),
      editions: {
        create: {
          description: `The vengeful King Schahriar agrees to stave off the execution of Queen Scheherazade until she finishes a particularly compelling story. Her plan? Bleed one tale into another. Through fanciful histories, romances, tragedies, comedies, poems, riddles, and songs, Scheherazade prolongs her life by holding the king’s rapt attention. With origins in Persian and Eastern Indian folklore, the stories of The Arabian Nights have been reworked, reshaped, revised, collected, and supplemented throughout the centuries by various authors and scholars - and are continually redefined by the modern translations of the Western world.`,
          publishedIn: new Date('2004-06'),
          title: 'The Arabian Nights',
        },
      },
    },
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
