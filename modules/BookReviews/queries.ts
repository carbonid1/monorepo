import helpers from './helpers';
import { useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import type { NBookReviews } from './interface';

const ReviewsQ = gql`
  query EditionQ($bookId: ID, $editionId: ID, $lang: String) {
    reviews(lang: $lang, bookId: $bookId, editionId: $editionId) {
      body
      lang
      id
      createdAt
    }
  }
`;

const useReviewsQuery = (variables: NBookReviews.QVars) => {
  const { data, loading } = useQuery<NBookReviews.QData, NBookReviews.QVars>(ReviewsQ, { variables });
  const { reviews } = data ?? { reviews: [] };
  return { reviews, loading };
};

const LangsQ = gql`
  query EditionQ($bookId: ID, $editionId: ID) {
    reviews(bookId: $bookId, editionId: $editionId) {
      lang
    }
  }
`;

const useLangsQuery = (variables: NBookReviews.QVars) => {
  const { data } = useQuery<NBookReviews.QData, NBookReviews.QVars>(LangsQ, { variables });
  return useMemo(() => helpers.makeLangOptions(data?.reviews), [data?.reviews]);
};

export default {
  useReviewsQuery,
  useLangsQuery,
};
