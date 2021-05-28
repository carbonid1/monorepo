import type { IAuthor } from 'types/interfaces';

type TAuthors = 'EpsteinD' | 'MartinG' | 'PratchettT' | 'BaxterS';
type TAuthorsMock = Record<TAuthors, IAuthor>;

const authorsMock: TAuthorsMock = {
  EpsteinD: {
    id: 1,
    fullName: 'David Epstein',
    books: [],
  },
  MartinG: {
    id: 2,
    fullName: 'George R.R. Martin',
    books: [],
  },
  PratchettT: {
    id: 3,
    fullName: 'Terry Pratchett',
    books: [],
  },
  BaxterS: {
    id: 4,
    fullName: 'Stephen Baxter',
    books: [],
  },
};

export default authorsMock;
