import type { IAuthor } from 'types/interfaces';

type TAuthors = 'EpsteinD' | 'MartinG' | 'PratchettT' | 'BaxterS';
interface IAuthorMock extends Omit<IAuthor, 'books'> {}

const initialMock: Record<TAuthors, IAuthorMock> = {
  EpsteinD: { fullName: 'David Epstein', id: 1 },
  MartinG: { fullName: 'George R.R. Martin', id: 2 },
  PratchettT: { fullName: 'Terry Pratchett', id: 3 },
  BaxterS: { fullName: 'Stephen Baxter', id: 4 },
};

const fillMock = (mock: IAuthorMock): IAuthor => ({ ...mock, books: [] });

const authorsMock: Record<TAuthors, IAuthor> = {
  EpsteinD: fillMock(initialMock.EpsteinD),
  MartinG: fillMock(initialMock.MartinG),
  PratchettT: fillMock(initialMock.PratchettT),
  BaxterS: fillMock(initialMock.BaxterS),
};

export default authorsMock;
