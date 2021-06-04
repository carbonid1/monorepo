import type { IReview } from 'types/interfaces';

interface ILangOpt {
  count: number;
  lang: string;
}

export type TSelectLanguageOptions = ILangOpt[];

const makeLangOptions = (reviews: IReview[] = []): TSelectLanguageOptions => {
  return reviews.reduce((acc: TSelectLanguageOptions, { lang }) => {
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
