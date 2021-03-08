import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.book.upsert({
    where: { id: 1 },
    update: {
      authors: {
        connectOrCreate: [{ where: { id: 1 }, create: { fullName: 'David Epstein' } }],
      },
      description: `What's the most effective path to success in any domain? It's not what you think.
      Plenty of experts argue that anyone who wants to develop a skill, play an instrument, or lead their field should start early, focus intensely, and rack up as many hours of deliberate practice as possible. If you dabble or delay, you'll never catch up to the people who got a head start. But a closer look at research on the world's top performers, from professional athletes to Nobel laureates, shows that early specialization is the exception, not the rule.
      David Epstein examined the world's most successful athletes, artists, musicians, inventors, forecasters and scientists. He discovered that in most fields--especially those that are complex and unpredictable--generalists, not specialists, are primed to excel. Generalists often find their path late, and they juggle many interests rather than focusing on one. They're also more creative, more agile, and able to make connections their more specialized peers can't see.
      Provocative, rigorous, and engrossing, Range makes a compelling case for actively cultivating inefficiency. Failing a test is the best way to learn. Frequent quitters end up with the most fulfilling careers. The most impactful inventors cross domains rather than deepening their knowledge in a single area. As experts silo themselves further while computers master more of the skills once reserved for highly focused humans, people who think broadly and embrace diverse experiences and perspectives will increasingly thrive.`,
      publishedIn: 2019,
      reviews: {
        connectOrCreate: [
          {
            where: { id: 1 },
            create: {
              body:
                'This book looks at how an emphasis on specialization can actually hamper our ability to really excel at something. It aligns with what I try to do when I am coaching, in my stories, and what we’re doing with Mamba Sports Academy—create all-around athletes who can think critically and make assessments in real time to enhance their play rather than rely only on a narrow set of skills.',
            },
          },
        ],
      },
      title: 'Range: Why Generalists Triumph in a Specialized World',
    },
    create: {
      authors: {
        connectOrCreate: [{ where: { id: 1 }, create: { fullName: 'David Epstein' } }],
      },
      description: `What's the most effective path to success in any domain? It's not what you think.
      Plenty of experts argue that anyone who wants to develop a skill, play an instrument, or lead their field should start early, focus intensely, and rack up as many hours of deliberate practice as possible. If you dabble or delay, you'll never catch up to the people who got a head start. But a closer look at research on the world's top performers, from professional athletes to Nobel laureates, shows that early specialization is the exception, not the rule.
      David Epstein examined the world's most successful athletes, artists, musicians, inventors, forecasters and scientists. He discovered that in most fields--especially those that are complex and unpredictable--generalists, not specialists, are primed to excel. Generalists often find their path late, and they juggle many interests rather than focusing on one. They're also more creative, more agile, and able to make connections their more specialized peers can't see.
      Provocative, rigorous, and engrossing, Range makes a compelling case for actively cultivating inefficiency. Failing a test is the best way to learn. Frequent quitters end up with the most fulfilling careers. The most impactful inventors cross domains rather than deepening their knowledge in a single area. As experts silo themselves further while computers master more of the skills once reserved for highly focused humans, people who think broadly and embrace diverse experiences and perspectives will increasingly thrive.`,
      publishedIn: 2019,
      reviews: {
        connectOrCreate: [
          {
            where: { id: 1 },
            create: {
              body:
                'This book looks at how an emphasis on specialization can actually hamper our ability to really excel at something. It aligns with what I try to do when I am coaching, in my stories, and what we’re doing with Mamba Sports Academy—create all-around athletes who can think critically and make assessments in real time to enhance their play rather than rely only on a narrow set of skills.',
            },
          },
        ],
      },
      title: 'Range: Why Generalists Triumph in a Specialized World',
    },
  });

  await prisma.book.upsert({
    where: { id: 2 },
    update: {
      authors: {
        connectOrCreate: [{ where: { id: 2 }, create: { fullName: 'George R.R. Martin' } }],
      },
      description: `Long ago, in a time forgotten, a preternatural event threw the seasons out of balance. In a land where summers can last decades and winters a lifetime, trouble is brewing. The cold is returning, and in the frozen wastes to the north of Winterfell, sinister and supernatural forces are massing beyond the kingdom’s protective Wall. At the center of the conflict lie the Starks of Winterfell, a family as harsh and unyielding as the land they were born to. Sweeping from a land of brutal cold to a distant summertime kingdom of epicurean plenty, here is a tale of lords and ladies, soldiers and sorcerers, assassins and bastards, who come together in a time of grim omens.
      Here an enigmatic band of warriors bear swords of no human metal; a tribe of fierce wildlings carry men off into madness; a cruel young dragon prince barters his sister to win back his throne; and a determined woman undertakes the most treacherous of journeys. Amid plots and counterplots, tragedy and betrayal, victory and terror, the fate of the Starks, their allies, and their enemies hangs perilously in the balance, as each endeavors to win that deadliest of conflicts: the game of thrones.`,
      publishedIn: 2005,
      title: 'A Game of Thrones',
    },
    create: {
      authors: {
        connectOrCreate: [{ where: { id: 2 }, create: { fullName: 'George R.R. Martin' } }],
      },
      description: `Long ago, in a time forgotten, a preternatural event threw the seasons out of balance. In a land where summers can last decades and winters a lifetime, trouble is brewing. The cold is returning, and in the frozen wastes to the north of Winterfell, sinister and supernatural forces are massing beyond the kingdom’s protective Wall. At the center of the conflict lie the Starks of Winterfell, a family as harsh and unyielding as the land they were born to. Sweeping from a land of brutal cold to a distant summertime kingdom of epicurean plenty, here is a tale of lords and ladies, soldiers and sorcerers, assassins and bastards, who come together in a time of grim omens.
      Here an enigmatic band of warriors bear swords of no human metal; a tribe of fierce wildlings carry men off into madness; a cruel young dragon prince barters his sister to win back his throne; and a determined woman undertakes the most treacherous of journeys. Amid plots and counterplots, tragedy and betrayal, victory and terror, the fate of the Starks, their allies, and their enemies hangs perilously in the balance, as each endeavors to win that deadliest of conflicts: the game of thrones.`,
      publishedIn: 2005,
      title: 'A Game of Thrones',
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
