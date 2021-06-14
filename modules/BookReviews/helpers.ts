import type { NBookReviews } from './interface';

const makeLangOptions = (reviews: NBookReviews.QData['reviews'] = []): NBookReviews.LangOptions => {
  return reviews.reduce((acc: NBookReviews.LangOptions, { lang }) => {
    if (!lang) return acc;
    const index = acc.findIndex(opt => opt.lang === lang);

    if (index >= 0) {
      acc[index] = { lang, count: acc[index].count + 1 };
      return acc;
    } else return [...acc, { lang, count: 1 }];
  }, []);
};

export default {
  makeLangOptions,
};
