import type { IAuthor } from 'types/interfaces';
import booksMock from './books.mock';

type TAuthors = 'EpsteinD';
type TAuthorsMock = (drillTo?: number) => Record<TAuthors, IAuthor>;

const authorsMock: TAuthorsMock = (drillTo = 4) => {
  const nextDrill = drillTo - 1;

  return {
    EpsteinD: {
      id: 1,
      fullName: 'David Epstein',
      books: nextDrill ? [booksMock(nextDrill).range] : [],
    },
  };
};

export default authorsMock;
