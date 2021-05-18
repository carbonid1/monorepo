import { useState } from 'react';
import type { IBook, IEdition } from 'types/interfaces';
import { useReviewLangOptions } from './hooks';
import { useReviewsQuery } from './queries';

export interface IBookReviews {
  bookId: IBook['id'];
  editionId: IEdition['id'];
}

export const BookReviews: React.FC<IBookReviews> = ({ bookId, editionId }) => {
  const [thisEditionOnly, setThisEditionOnly] = useState(false);
  const [lang, setLang] = useState<string | null>(null);
  const { reviews } = useReviewsQuery({ bookId, editionId: thisEditionOnly ? editionId : null, lang });
  const langOptions = useReviewLangOptions(reviews);

  return (
    <div>
      <div className="font-bold text-2xl py-4">Reviews:</div>
      <select
        name="languages"
        id="lang-select"
        className="border-grey-400 border-2 rounded-lg mr-2"
        onChange={({ target: { value } }) => {
          if (value === '') return setLang(null);
          else setLang(value);
        }}
      >
        {langOptions}
      </select>
      <label>
        <input
          type="checkbox"
          checked={thisEditionOnly}
          onChange={e => setThisEditionOnly(e.target.checked)}
          className="mr-2"
        />
        This Edition
      </label>
      <div className="grid gap-2 mt-4">
        {reviews.map(review => (
          <div key={review.id}>
            <div>{review.createdAt}</div>
            <div>{review.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
