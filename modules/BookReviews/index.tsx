import { gql, useQuery } from '@apollo/client';
import type { IBook, IEdition, IReview } from 'types/interfaces';

export interface IBookReviews {
  bookId: IBook['id'];
  editionId: IEdition['id'];
}
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

export const BookReviews: React.FC<IBookReviews> = ({ bookId, editionId }) => {
  const { data } = useQuery<IQData, IQVars>(ReviewsQ, {
    variables: { bookId, editionId, lang: null },
  });

  return (
    <div className="grid py-4 gap-2">
      {data?.reviews.map(review => (
        <div key={review.id}>
          <div>{review.createdAt}</div>
          <div>{review.body}</div>
        </div>
      ))}
    </div>
  );
};
