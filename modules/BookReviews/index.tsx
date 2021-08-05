import formatDate from 'utils/formatDate';
import hooks from './hooks';
import { ISelect, Select } from 'components/@controls/Select';
import { LoadingContent } from 'components/@layout/LoadingContent';
import { Paragraph } from 'components/@typography/Paragraph';
import { Skeleton } from 'components/@layout/Skeleton';
import { Toggle } from 'components/@controls/Toggle';
import { useState } from 'react';
import { useToggler } from 'hooks/useToggler';
import type { NBookReviews } from './interface';

export const BookReviews: React.FC<NBookReviews.Props> = (props) => {
  const [thisEditionOnly, setThisEditionOnly] = useToggler();
  const [lang, setLang] = useState<ISelect<NBookReviews.SelectedLanguage>['value']>(null);
  const bookId = props.bookId.toString()
  const editionId = thisEditionOnly ? props.editionId.toString() : null
  const { reviews, loading, previousData } = hooks.useReviewsQuery({ lang, bookId, editionId });
  const langOptions = hooks.useLangOptions({ bookId, editionId });

  return (
    <div>
      <div className="py-4 text-2xl font-bold">Reviews:</div>
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
      <LoadingContent
        className="mt-4"
        loading={loading}
        empty={!reviews.length}
        initiallyLoaded={Boolean(previousData)}
        subTitle="There are no reviews yet. You can submit the first one!"
        loader={
          <div className="flex flex-col gap-y-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        }
      >
        <div className="grid gap-2 auto-rows-max">
          {reviews.map(review => (
            <div key={review.id}>
              <div className="font-bold">{formatDate(review.createdAt)}</div>
              <Paragraph ellipsis={{ rows: 5 }}>{review.body}</Paragraph>
            </div>
          ))}
        </div>
      </LoadingContent>
    </div>
  );
};
