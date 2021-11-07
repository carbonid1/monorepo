import faker from 'faker';
import type gg from 'lib/generated';
import authorsMock from './authors.mock';
import editionsMock from './editions.mock';

type TBook = '1' | '2' | '3' | '4';
type TBooksMock = Record<TBook, gg.Book>;

const booksMock: TBooksMock = {
  1: {
    id: faker.datatype.uuid(),
    publishedIn: faker.date.past().getTime().toString(),
    authors: [authorsMock[1]],
    editions: [editionsMock.firstEn, editionsMock.firstUk],
  },
  2: {
    id: faker.datatype.uuid(),
    publishedIn: faker.date.past().getTime().toString(),
    authors: [authorsMock[2]],
    editions: [editionsMock.second],
  },
  3: {
    id: faker.datatype.uuid(),
    publishedIn: faker.date.past().getTime().toString(),
    authors: [authorsMock[3], authorsMock[4]],
    editions: [editionsMock.third],
  },
  4: {
    id: faker.datatype.uuid(),
    publishedIn: faker.date.past().getTime().toString(),
    authors: [],
    editions: [editionsMock.fourth],
  },
};

export default booksMock;
