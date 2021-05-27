import type { IAuthor } from 'types/interfaces';
import booksMock from './books.mock';

type TAuthors = 'EpsteinD';
const authorsMock: Record<TAuthors, (mock: boolean) => IAuthor> = {
  EpsteinD: (mock = true) => ({
    id: 1,
    fullName: 'David Epstein',
    books: [booksMock.range(mock)],
  }),
};

export default authorsMock;
