import faker from 'faker';
import type gg from 'lib/generated';

type TAuthors = '1' | '2' | '3' | '4';

const fillMock = (locale = 'en'): gg.Author => {
  faker.locale = locale;
  return {
    books: [],
    id: faker.datatype.uuid(),
    bio: faker.lorem.paragraphs(2),
    fullName: faker.name.findName(),
    imageUrl: faker.image.abstract(160, 240),
  };
};

const authorsMock: Record<TAuthors, gg.Author> = {
  1: fillMock(),
  2: fillMock('uk'),
  3: fillMock('ar'),
  4: fillMock(),
};

export default authorsMock;
