import type { IEdition } from 'types/interfaces';
import books from './books.mock';

type TEditions = 'rangeEng';
const editionsMock: Record<TEditions, IEdition> = {
  rangeEng: {
    id: 1,
    publishedIn: 'May 28th 2019',
    description: `What's the most effective path to success in any domain? It's not what you think. Plenty of experts argue that anyone who wants to develop a skill, play an instrument, or lead their field should start early, focus intensely, and rack up as many hours of deliberate practice as possible. If you dabble or delay, you'll never catch up to the people who got a head start. But a closer look at research on the world's top performers, from professional athletes to Nobel laureates, shows that early specialization is the exception, not the rule. David Epstein examined the world's most successful athletes, artists, musicians, inventors, forecasters and scientists. He discovered that in most fields--especially those that are complex and unpredictable--generalists, not specialists, are primed to excel. Generalists often find their path late, and they juggle many interests rather than focusing on one. They're also more creative, more agile, and able to make connections their more specialized peers can't see. Provocative, rigorous, and engrossing, Range makes a compelling case for actively cultivating inefficiency. Failing a test is the best way to learn. Frequent quitters end up with the most fulfilling careers. The most impactful inventors cross domains rather than deepening their knowledge in a single area. As experts silo themselves further while computers master more of the skills once reserved for highly focused humans, people who think broadly and embrace diverse experiences and perspectives will increasingly thrive.`,
    book: books.range,
    lang: 'English',
    title: 'Range: Why Generalists Triumph in a Specialized World',
    cover: 'https://res.cloudinary.com/book-hub/image/upload/v1621965132/covers/sm/range_fy4vdv.jpg',
    reviews: [],
  },
};

export default editionsMock;
