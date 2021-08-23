import authorsMock from './authors.mock';
import editionsMock from './editions.mock';
import getTime from 'date-fns/getTime';
import type { Book } from 'lib/generated/graphql';

type TBook = 'range' | 'goT' | 'LongMars' | 'ArabianN';
type TBooksMock = Record<TBook, Book>;

const booksMock: TBooksMock = {
  range: {
    id: 1,
    publishedIn: getTime(new Date('2019-05-28')).toString(),
    authors: [authorsMock.EpsteinD],
    editions: [editionsMock.rangeEng, editionsMock.rangeRu],
  },
  goT: {
    id: 2,
    publishedIn: getTime(new Date('1996-08-06')).toString(),
    authors: [authorsMock.MartinG],
    editions: [editionsMock.goT],
  },
  LongMars: {
    id: 3,
    publishedIn: getTime(new Date('2014-06-19')).toString(),
    authors: [authorsMock.PratchettT, authorsMock.BaxterS],
    editions: [editionsMock.LongMars],
  },
  ArabianN: {
    id: 4,
    publishedIn: getTime(new Date('800')).toString(),
    authors: [],
    editions: [editionsMock.ArabianN],
  },
};

export default booksMock;
