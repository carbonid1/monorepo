import type { IAuthor } from 'types/interfaces';

type TAuthors = 'EpsteinD' | 'MartinG' | 'PratchettT' | 'BaxterS';
interface IInitialMock extends Omit<IAuthor, 'books' | 'id'> {}

const initialMock: Record<TAuthors, IInitialMock> = {
  EpsteinD: {
    fullName: 'David Epstein',
    imageUrl: 'https://res.cloudinary.com/book-hub/image/upload/v1623757100/authors/david_z3mcj0.png',
  },
  MartinG: {
    fullName: 'George R.R. Martin',
    imageUrl:
      'https://res.cloudinary.com/book-hub/image/upload/v1623757149/authors/Portrait_photoshoot_at_Worldcon_75_2C_Helsinki_2C_before_the_Hugo_Awards__E2_80_93_George_R._R._Martin_gltjf5.jpg',
  },
  PratchettT: {
    fullName: 'Terry Pratchett',
    imageUrl: 'https://res.cloudinary.com/book-hub/image/upload/v1623757195/authors/Terry-Pratchett-2011_zbwqv8.jpg',
  },
  BaxterS: {
    fullName: 'Stephen Baxter',
    imageUrl: 'https://res.cloudinary.com/book-hub/image/upload/v1623757228/authors/Issue01_Baxter_200x300_rxdztr.jpg',
  },
};

let count = 0;
const fillMock = (mock: IInitialMock): IAuthor => {
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
