import { useMemo } from 'react';
import type { IReview } from 'types/interfaces';
import ISO6391 from 'iso-639-1';

interface ILangOpt {
  count: number;
  lang: string;
}
const makeLangOptions = (reviews: IReview[]) => {
  return reviews.reduce((acc: ILangOpt[], { lang }) => {
    const index = acc.findIndex(opt => opt.lang === lang);
    if (index >= 0) {
      acc[index] = { lang, count: acc[index].count + 1 };
      return acc;
    } else return [...acc, { lang, count: 1 }];
  }, []);
};

export const useReviewLangOptions = (reviews: IReview[]) => {
  const options = useMemo(() => {
    const languagesOpts = makeLangOptions(reviews);
    const selectOptions = languagesOpts.map(({ lang, count }) => (
      <option value={lang}>
        {ISO6391.getName(lang)}({count})
      </option>
    ));
    return [<option value="">All Languages</option>, ...selectOptions];
  }, []);
  // reviews not included as deps deliberately
  // when filtered they would broke the options
  // needs a better idea

  return options;
};
