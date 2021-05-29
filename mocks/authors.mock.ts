import type { IAuthor } from 'types/interfaces';

type TAuthors = 'EpsteinD' | 'MartinG' | 'PratchettT' | 'BaxterS';
interface IAuthorMock extends Omit<IAuthor, 'books' | 'id'> {}

const initialMock: Record<TAuthors, IAuthorMock> = {
  EpsteinD: { fullName: 'David Epstein' },
  MartinG: { fullName: 'George R.R. Martin' },
  PratchettT: { fullName: 'Terry Pratchett' },
  BaxterS: { fullName: 'Stephen Baxter' },
};

let count = 0;
const fillMock = (mock: IAuthorMock): IAuthor => {
  count++;
  return { ...mock, books: [], id: count };
};

const authorsMock: Record<TAuthors, IAuthor> = {
  EpsteinD: fillMock(initialMock.EpsteinD),
  MartinG: fillMock(initialMock.MartinG),
  PratchettT: fillMock(initialMock.PratchettT),
  BaxterS: fillMock(initialMock.BaxterS),
};

export default authorsMock;
