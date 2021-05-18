import React, { useMemo } from 'react';
import type { IEdition } from 'types/interfaces';

export interface IBookReviews {
  editions: IEdition[];
}
export const BookReviews: React.FC<IBookReviews> = ({ editions }) => {
  const allReviews = useMemo(
    () => editions.reduce((reviews: typeof edition.reviews, edition) => [...reviews, ...edition.reviews], []),
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
