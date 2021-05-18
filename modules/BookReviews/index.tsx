import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
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
  const [thisEditionOnly, setThisEditionOnly] = useState(false);
  const { data } = useQuery<IQData, IQVars>(ReviewsQ, {
    variables: { bookId, editionId: thisEditionOnly ? editionId : null, lang: null },
  });

  if (!data?.reviews.length) return null;

  return (
    <div>
      <div className="font-bold text-2xl py-4">Reviews:</div>
      <label htmlFor="this-edition-toggle">
        <input
          type="checkbox"
          checked={thisEditionOnly}
          id="this-edition-toggle"
          onChange={e => setThisEditionOnly(e.target.checked)}
          className="mr-2"
        />
        This Edition
      </label>
      <div className="grid gap-2">
        {data?.reviews.map(review => (
          <div key={review.id}>
            <div>{review.createdAt}</div>
            <div>{review.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
