import { gql, useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import type { IBook, IEdition, IReview } from 'types/interfaces';
import ISO6391 from 'iso-639-1';

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
  const [lang, setLang] = useState<string | null>(null);
  const { data } = useQuery<IQData, IQVars>(ReviewsQ, {
    variables: { bookId, editionId: thisEditionOnly ? editionId : null, lang },
  });

  const options = useMemo(() => {
    const allOption = <option value="">All Languages</option>;
    const langsOpts = data?.reviews.map(({ lang }) => <option value={lang}>{ISO6391.getName(lang)}</option>);
    return [allOption, langsOpts];
  }, []);

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
        {options}
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
