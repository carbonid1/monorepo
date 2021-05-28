import type { IBook, IEdition } from 'types/interfaces';
import booksMock, { mockedBook } from './books.mock';
import reviewsMock from './reviews.mock';

type TEditions = 'rangeEng' | 'rangeRu';
type TEditionsMock = (drillTo?: number) => Record<TEditions, IEdition>;

export const emptyEdition: IEdition = {
  id: 1,
  title: '',
  reviews: [],
  book: {} as IBook,
};

const editionsMock: TEditionsMock = (drillTo = 4) => {
  const nextDrill = drillTo - 1;

  const reviews = reviewsMock(0);
  console.log('reviews =======>>>>>>>', reviews);

  return {
    rangeEng: {
      id: 1,
      publishedIn: 'May 28th 2019', // new Date('2019-05-28')
      description: `What's the most effective path to success in any domain? It's not what you think. Plenty of experts argue that anyone who wants to develop a skill, play an instrument, or lead their field should start early, focus intensely, and rack up as many hours of deliberate practice as possible. If you dabble or delay, you'll never catch up to the people who got a head start. But a closer look at research on the world's top performers, from professional athletes to Nobel laureates, shows that early specialization is the exception, not the rule. David Epstein examined the world's most successful athletes, artists, musicians, inventors, forecasters and scientists. He discovered that in most fields--especially those that are complex and unpredictable--generalists, not specialists, are primed to excel. Generalists often find their path late, and they juggle many interests rather than focusing on one. They're also more creative, more agile, and able to make connections their more specialized peers can't see. Provocative, rigorous, and engrossing, Range makes a compelling case for actively cultivating inefficiency. Failing a test is the best way to learn. Frequent quitters end up with the most fulfilling careers. The most impactful inventors cross domains rather than deepening their knowledge in a single area. As experts silo themselves further while computers master more of the skills once reserved for highly focused humans, people who think broadly and embrace diverse experiences and perspectives will increasingly thrive.`,
      book: nextDrill > 0 ? booksMock(nextDrill).range : mockedBook,
      lang: 'en',
      title: 'Range: Why Generalists Triumph in a Specialized World',
      cover: 'https://res.cloudinary.com/book-hub/image/upload/v1621965132/covers/sm/range_fy4vdv.jpg',
      reviews: nextDrill > 0 ? [reviewsMock(nextDrill).rangeEng1] : [],
    },
    rangeRu: {
      id: 2,
      publishedIn: '', // new Date('2020-11-18'),
      description: `Эта книга перевернет ваши представления о пути к профессиональному успеху! Революционный подход Дэвида Эпштейна, магистра экологических наук и журналистики, ставит под сомнение идею 10 000 часов. Он исследовал примеры самых успешных спортсменов, художников, музыкантов, нобелевских лауреатов и ученых и обнаружил, что в большинстве областей ранняя и узкая специализация – не синоним результата. Именно универсалы — изобретательные и гибкие люди с широким кругозором и большим жизненным опытом — рулят в мире больших скоростей.`,
      book: nextDrill > 0 ? booksMock(nextDrill).range : mockedBook,
      lang: 'ru',
      title: 'Универсалы. Как талантливые дилетанты становятся победителями по жизни',
      cover: 'https://res.cloudinary.com/book-hub/image/upload/v1621965192/covers/sm/range_f2gjvq.jpg',
      reviews: nextDrill > 0 ? [reviewsMock(nextDrill).rangeRu1, reviewsMock(nextDrill).rangeRu2] : [],
    },
  };
};

export default editionsMock;
