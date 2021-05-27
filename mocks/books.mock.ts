import type { IBook } from 'types/interfaces';
import authorsMock from './authors.mock';
import editionsMock from './editions.mock';

type TBook = 'range';
const booksMock: Record<TBook, (mock: boolean) => IBook> = {
  range: mock => ({
    id: 1,
    publishedIn: 'May 28th 2019',
    authors: mock ? [] : [authorsMock.EpsteinD(true)],
    editions: mock ? [] : [editionsMock.rangeEng(true)],
  }),
};

export default booksMock;
