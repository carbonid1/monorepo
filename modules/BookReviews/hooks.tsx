import { useMemo } from 'react';
import languageService from 'services/language.service';
import type { IReview } from 'types/interfaces';

interface ILangOpt {
  count: number;
  lang: string;
}
const makeLangOptions = (reviews: IReview[]) => {
  return reviews.reduce((acc: ILangOpt[], { lang }) => {
    if (!lang) return acc;
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
        {languageService.getName(lang)}({count})
      </option>
    ));
    return [<option value="">All Languages</option>, ...selectOptions];
  }, []);
  // reviews not included as deps deliberately
  // when filtered they would broke the options
  // needs a better idea

  return options;
};
