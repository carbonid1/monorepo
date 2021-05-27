import type { IAuthor } from 'types/interfaces';
import booksMock from './books.mock';

type TAuthors = 'EpsteinD';
const authorsMock: (stopTraversing?: boolean) => Record<TAuthors, IAuthor> = (stopTraversing = false) => ({
  EpsteinD: {
    id: 1,
    fullName: 'David Epstein',
    books: [booksMock(stopTraversing).range],
  },
});

export default authorsMock;
