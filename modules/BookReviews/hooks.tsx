import helpers from './helpers';
import languageService from 'services/language.service';
import {
  BookReviews_LangReviewsQueryVariables,
  BookReviews_ReviewsQueryVariables,
  useBookReviews_LangReviewsQuery,
  useBookReviews_ReviewsQuery
  } from 'generated/graphql';
import { useMemo } from 'react';
import type { ISelect } from 'components/@controls/Select';
import type { NBookReviews } from './interface';

const useLangOptions = (languagesOpts: NBookReviews.LangOptions): ISelect<string | null>['options'] => {
  return useMemo(() => {
    const selectOptions = languagesOpts.map(({ lang, count }) => ({
      value: lang,
      label: `${languageService.getName(lang)} (${count})`,
    }));
    return [{ value: null, label: 'All Languages' }, ...selectOptions];
  }, [languagesOpts]);
};

const useReviewsQuery = (variables: BookReviews_ReviewsQueryVariables) => {
  const { data, loading, previousData } = useBookReviews_ReviewsQuery({ variables })
  const { reviews } = data || previousData || { reviews: [] };
  return { reviews, loading, previousData };
};

const useLangsQuery = (variables: BookReviews_LangReviewsQueryVariables) => {
  const { data } = useBookReviews_LangReviewsQuery({ variables });
  return useMemo(() => helpers.makeLangOptions(data?.reviews), [data?.reviews]);
};

export default {
  useLangsQuery,
  useLangOptions,
  useReviewsQuery,
};
