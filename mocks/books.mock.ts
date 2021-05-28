import type { IBook } from 'types/interfaces';
import authorsMock from './authors.mock';
import editionsMock from './editions.mock';

type TBook = 'range' | 'goT' | 'LongMars' | 'ArabianN';
type TBooksMock = Record<TBook, IBook>;

const booksMock: TBooksMock = {
  range: {
    id: 1,
    publishedIn: 'May 28th 2019', // new Date('2019-05-28')
    authors: [authorsMock.EpsteinD],
    editions: [editionsMock.rangeEng, editionsMock.rangeRu],
  },
  goT: {
    id: 2,
    publishedIn: '', // new Date('1996-08-06'),
    authors: [authorsMock.MartinG],
    editions: [editionsMock.goT],
  },
  LongMars: {
    id: 3,
    publishedIn: '', // new Date('2014-06-19'),
    authors: [authorsMock.PratchettT, authorsMock.BaxterS],
    editions: [editionsMock.LongMars],
  },
  ArabianN: {
    id: 4,
    publishedIn: '', // new Date('800'),
    authors: [],
    editions: [editionsMock.ArabianN],
  },
};

export default booksMock;
