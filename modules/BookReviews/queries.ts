import { gql, useQuery } from '@apollo/client';
import type { IReview } from 'types/interfaces';

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

export default {
  useReviewsQuery,
};
