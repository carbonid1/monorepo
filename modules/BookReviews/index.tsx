import React, { useMemo } from 'react';
import type { IEdition, IReview } from 'types/interfaces';

export interface IBookReviews {
  editions: IEdition[];
}
export const BookReviews: React.FC<IBookReviews> = ({ editions }) => {
  const allReviews = useMemo(
    () => editions.reduce((reviews, edition) => [...reviews, ...edition.reviews], [] as IReview[]),
    [editions]
  );

  return (
    <div className="grid py-4 gap-2">
      {allReviews.map(review => (
        <div key={review.id}>
          <div>{review.createdAt}</div>
          <div>{review.body}</div>
        </div>
      ))}
    </div>
  );
};
