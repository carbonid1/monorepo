import hooks from './hooks';
import queries from './queries';
import { useState } from 'react';
import formatDate from 'utils/formatDate';
import type { NBookReviews } from './interface';
import { ISelect, Select } from 'components/@controls/Select';
import { Toggle } from 'components/@controls/Toggle';
import { Paragraph } from 'components/@typography/Paragraph';
import { useToggler } from 'hooks/useToggler';

export const BookReviews: React.FC<NBookReviews.Props> = ({ bookId, editionId }) => {
  const [thisEditionOnly, setThisEditionOnly] = useToggler();
  const [lang, setLang] = useState<ISelect<NBookReviews.SelectedLanguage>['value']>(null);
  const { reviews } = queries.useReviewsQuery({ bookId, editionId: thisEditionOnly ? editionId : null, lang });
  const reviewLangs = queries.useLangsQuery({ bookId, editionId: thisEditionOnly ? editionId : null, lang: null });
  const langOptions = hooks.useLangOptions(reviewLangs);

  return (
    <div>
      <div className="font-bold text-2xl py-4">Reviews:</div>
      <div className="flex gap-x-4">
        <Select options={langOptions} value={lang} onChange={setLang} />
        <Toggle
          label="This Edition Only"
          isChecked={thisEditionOnly}
          onChange={() => {
            setLang(null);
            setThisEditionOnly();
          }}
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
