import type { IBook } from 'types/interfaces';
import authorsMock from './authors.mock';
import editionsMock from './editions.mock';

type TBook = 'range';
const booksMock: (stopTraversing?: boolean) => Record<TBook, IBook> = (stopTraversing = false) => ({
  range: {
    id: 1,
    publishedIn: 'May 28th 2019',
    authors: stopTraversing ? [] : [authorsMock(true).EpsteinD],
    editions: stopTraversing ? [] : [editionsMock(true).rangeEng],
  },
});

export default booksMock;
