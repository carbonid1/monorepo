import type { IAuthor } from 'types/interfaces';

type TAuthors = 'EpsteinD';
type TAuthorsMock = Record<TAuthors, IAuthor>;

const authorsMock: TAuthorsMock = {
  EpsteinD: {
    id: 1,
    fullName: 'David Epstein',
    books: [],
  },
};

export default authorsMock;
