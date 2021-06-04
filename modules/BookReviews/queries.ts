import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import type { IReview } from 'types/interfaces';
import helpers from './helpers';

interface IQData {
  reviews: IReview[];
}

interface IQVars {
  bookId: number | null;
  editionId: number | null;
  lang: string | null;
}

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

const useReviewsQuery = (variables: IQVars) => {
  const { data } = useQuery<IQData, IQVars>(ReviewsQ, { variables });
  const { reviews } = data ?? { reviews: [] };
  return { reviews };
};

const LangsQ = gql`
  query EditionQ($bookId: ID, $editionId: ID) {
    reviews(bookId: $bookId, editionId: $editionId) {
      lang
    }
  }
`;

const useLangsQuery = (variables: IQVars) => {
  const { data } = useQuery<IQData, IQVars>(LangsQ, { variables });
  return useMemo(() => helpers.makeLangOptions(data?.reviews), [data?.reviews]);
};

export default {
  useReviewsQuery,
  useLangsQuery,
};
