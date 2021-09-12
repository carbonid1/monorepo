import { useState } from 'react';
import { formatDate } from 'lib/utils';
import { ISelect, Select } from 'lib/components/@controls/Select';
import { Paragraph } from 'lib/components/@typography/Paragraph';
import { Skeleton } from 'lib/components/@layout/Skeleton';
import { Toggle } from 'lib/components/@controls/Toggle';
import { useToggler } from 'lib/hooks';
import type { BookReviewsProps, SelectedLanguage } from './interface';
import { useLangOptions, useReviewsQuery } from './hooks';
import $ from './styled';

export const BookReviews: React.FC<BookReviewsProps> = props => {
  const [thisEdition, setThisEdition] = useToggler();
  const [lang, setLang] = useState<ISelect<SelectedLanguage>['value']>(null);
  const bookId = props.bookId.toString();
  const editionId = thisEdition ? props.editionId.toString() : null;
  const { reviews, loading, previousData } = useReviewsQuery({ lang, bookId, editionId });
  const langOptions = useLangOptions({ bookId, editionId });

  return (
    <div>
      <div className="py-4 text-2xl font-bold">Reviews:</div>
      <$.Filters>
        <Select options={langOptions} value={lang} onChange={setLang} />
        <Toggle
          label="This Edition"
          isChecked={thisEdition}
          onChange={() => {
            setLang(null);
            setThisEdition();
          }}
        />
      </$.Filters>
      <$.LoadingContent
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
        <$.ReviewsWrapper>
          {reviews.map(review => (
            <div key={review.id}>
              <div className="font-bold">{formatDate(review.createdAt)}</div>
              <Paragraph ellipsis={{ rows: 5 }}>{review.body}</Paragraph>
            </div>
          ))}
        </$.ReviewsWrapper>
      </$.LoadingContent>
    </div>
  );
};
