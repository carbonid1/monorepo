import faker from 'faker';
import startCase from 'lodash/startCase';
import type gg from 'lib/generated';
import reviewsMock from './reviews.mock';

type TEditions = 'firstEn' | 'firstUk' | 'second' | 'third' | 'fourth';
type TEditionsMock = Record<TEditions, gg.Edition>;
type TFillMock = (options: { reviews?: gg.Edition['reviews']; lang?: string; paragraphs?: number }) => gg.Edition;

const fillMock: TFillMock = ({ lang = 'en', reviews = [], paragraphs }) => {
  faker.locale = lang;

  return {
    lang,
    reviews,
    book: {} as gg.Book,
    id: faker.datatype.uuid(),
    title: startCase(faker.lorem.words()),
    cover: faker.image.business(160, 240),
    description: faker.lorem.paragraphs(paragraphs),
    publishedIn: faker.date.past().getTime().toString(),
  };
};

const editionsMock: TEditionsMock = {
  firstEn: fillMock({ reviews: [reviewsMock.en1] }),
  firstUk: fillMock({ lang: 'uk', reviews: [reviewsMock.uk1, reviewsMock.uk2] }),
  second: fillMock({}),
  third: fillMock({}),
  fourth: fillMock({}),
};

export default editionsMock;
