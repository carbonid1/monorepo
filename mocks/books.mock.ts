import type { IBook } from 'types/interfaces';
import authors from './authors.mock';

type TBooks = 'range';
const booksMock: Record<TBooks, IBook> = {
  range: {
    id: 1,
    publishedIn: 'May 28th 2019',
    authors: [authors.EpsteinD],
    editions: [],
  },
};

export default booksMock;
