import helpers from './helpers';
import languageService from 'services/language.service';
import {
  BookReviews_LangReviewsQueryVariables,
  BookReviews_ReviewsQueryVariables,
  useBookReviews_LangReviewsQuery,
  useBookReviews_ReviewsQuery,
} from 'generated/graphql';
import { useMemo } from 'react';
import type { ISelect } from 'components/@controls/Select';
import type { NBookReviews } from './interface';

type TUseLangOptions = (
  variables: BookReviews_LangReviewsQueryVariables,
) => ISelect<NBookReviews.SelectedLanguage>['options'];

const useLangOptions: TUseLangOptions = variables => {
  const { data } = useBookReviews_LangReviewsQuery({ variables });

  const options = useMemo(() => {
    return helpers.makeLangOptions(data?.reviews);
  }, [data?.reviews]);

  return useMemo(() => {
    const selectOptions = options.map(({ lang, count }) => ({
      value: lang,
      label: `${languageService.getName(lang)} (${count})`,
    }));
    return [{ value: null, label: 'All Languages' }, ...selectOptions];
  }, [options]);
};

const useReviewsQuery = (variables: BookReviews_ReviewsQueryVariables) => {
  const { data, loading, previousData } = useBookReviews_ReviewsQuery({ variables });
  const { reviews } = data || previousData || { reviews: [] };
  return { reviews, loading, previousData };
};

export default {
  useLangOptions,
  useReviewsQuery,
};
