import type { IBook } from 'types/interfaces';
import authorsMock from './authors.mock';
import editionsMock from './editions.mock';

type TBook = 'range';
type TBooksMock = Record<TBook, IBook>;

const booksMock: TBooksMock = {
  range: {
    id: 1,
    publishedIn: 'May 28th 2019', // new Date('2019-05-28')
    authors: [authorsMock.EpsteinD],
    editions: [editionsMock.rangeEng, editionsMock.rangeRu],
  },
};

export default booksMock;
