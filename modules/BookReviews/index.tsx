import { ISelect, Select } from 'components/@controls/Select';
import { Toggle } from 'components/@controls/Toggle';
import { Paragraph } from 'components/@typography/Paragraph';
import { useState } from 'react';
import type { IBook, IEdition } from 'types/interfaces';
import formatDate from 'utils/formatDate';
import hooks from './hooks';
import queries from './queries';

export interface IBookReviews {
  bookId: IBook['id'];
  editionId: IEdition['id'];
}

export const BookReviews: React.FC<IBookReviews> = ({ bookId, editionId }) => {
  const [thisEditionOnly, setThisEditionOnly] = useState(false);
  const [lang, setLang] = useState<ISelect<string | null>['value']>(null);
  const { reviews } = queries.useReviewsQuery({ bookId, editionId: thisEditionOnly ? editionId : null, lang });
  const reviewLangs = queries.useLangsQuery({ bookId, editionId: thisEditionOnly ? editionId : null, lang: null });
  const langOptions = hooks.useLangOptions(reviewLangs);

  return (
    <div>
      <div className="font-bold text-2xl py-4">Reviews:</div>
      <div className="flex gap-x-4">
        <Select options={langOptions} value={lang} onChange={setLang} />
        <Toggle
          isChecked={thisEditionOnly}
          onChange={isChecked => {
            setLang(null);
            setThisEditionOnly(isChecked);
          }}
          label="This Edition Only"
        />
      </div>
      <div className="grid gap-2 auto-rows-max mt-4 min-h-[400px]">
        {reviews.map(review => (
          <div key={review.id}>
            <div className="font-bold">{formatDate(review.createdAt)}</div>
            <Paragraph ellipsis={{ rows: 5 }}>{review.body}</Paragraph>
          </div>
        ))}
      </div>
    </div>
  );
};
