import faker from 'faker';
import type gg from 'lib/generated';

type TReviews = 'en1' | 'uk1' | 'uk2';
type TReviewsMock = Record<TReviews, gg.Review>;

const fillMock = ({ lang = 'en', paragraphs = 1 }): gg.Review => {
  return {
    lang,
    id: faker.datatype.uuid(),
    edition: {} as gg.Edition,
    body: faker.lorem.paragraphs(paragraphs),
    createdAt: faker.date.past().getTime().toString(),
    updatedAt: faker.date.past().getTime().toString(),
  };
};

const reviewsMock: TReviewsMock = {
  en1: fillMock({ lang: 'en', paragraphs: 1 }),
  uk1: fillMock({ lang: 'uk', paragraphs: 3 }),
  uk2: fillMock({ lang: 'uk', paragraphs: 7 }),
};

export default reviewsMock;
