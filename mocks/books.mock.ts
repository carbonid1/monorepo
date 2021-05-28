import type { IBook } from 'types/interfaces';
import authorsMock from './authors.mock';
import editionsMock from './editions.mock';

type TBook = 'range';
type TBooksMock = (drillTo?: number) => Record<TBook, IBook>;

export const mockedBook: IBook = {
  id: 1,
  authors: [],
  editions: [],
};

const booksMock: TBooksMock = (drillTo = 4) => {
  const nextDrill = drillTo - 1;

  return {
    range: {
      id: 1,
      publishedIn: 'May 28th 2019', // new Date('2019-05-28')
      authors: nextDrill > 0 ? [authorsMock(nextDrill).EpsteinD] : [],
      editions: nextDrill > 0 ? [editionsMock(nextDrill).rangeEng] : [],
    },
  };
};

export default booksMock;
