import type { IAuthor } from 'types/interfaces';

type TBooks = 'EpsteinD';
const authorsMock: Record<TBooks, IAuthor> = {
  EpsteinD: {
    id: 1,
    fullName: 'David Epstein',
    books: [],
  },
};

export default authorsMock;
