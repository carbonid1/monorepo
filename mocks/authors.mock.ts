import type { IAuthor } from 'types/interfaces';
import booksMock from './books.mock';

type TAuthors = 'EpsteinD';

const authorsMock: Record<TAuthors, IAuthor> = {
  EpsteinD: {
    id: 1,
    fullName: 'David Epstein',
    books: [booksMock.range(true)],
  },
};

export default authorsMock;
