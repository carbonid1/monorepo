import { useMemo } from 'react';
import languageService from 'lib/services/language.service';
import {
  BookReviews_LangReviewsQueryVariables,
  BookReviews_ReviewsQueryVariables,
  useBookReviews_LangReviewsQuery,
  useBookReviews_ReviewsQuery,
} from 'lib/generated/graphql';
import type { ISelect } from 'lib/components/@controls/Select';
import type { SelectedLanguage } from './interface';
import { makeLangOptions } from './helpers';

type TUseLangOptions = (variables: BookReviews_LangReviewsQueryVariables) => ISelect<SelectedLanguage>['options'];

export const useLangOptions: TUseLangOptions = variables => {
  const { data } = useBookReviews_LangReviewsQuery({ variables });

  const options = useMemo(() => makeLangOptions(data?.reviews), [data?.reviews]);

  return useMemo(() => {
    const selectOptions = options.map(({ lang, count }) => ({
      value: lang,
      label: `${languageService.getName(lang)} (${count})`,
    }));
    return [{ value: null, label: 'All Languages' }, ...selectOptions];
  }, [options]);
};

export const useReviewsQuery = (variables: BookReviews_ReviewsQueryVariables) => {
  const { data, loading, previousData } = useBookReviews_ReviewsQuery({ variables });
  const { reviews } = data || previousData || { reviews: [] };
  return { reviews, loading, previousData };
};
