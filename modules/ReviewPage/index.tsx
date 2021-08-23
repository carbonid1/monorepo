import { CustomHead } from 'components/CustomHead';
import { Authors } from 'components/Authors';
import { useReviewPage_ReviewQuery } from 'generated/graphql';
import { NotFound, ServerError } from 'components/@errors';
import type { NextPage } from 'next';

interface IReview {
  id: string;
}

const Review: NextPage<IReview> = ({ id }) => {
  const { data, error } = useReviewPage_ReviewQuery({ variables: { id } });
  const { review } = data ?? {};

  if (error) return <ServerError />;
  if (!review) return <NotFound />;

  const { body, edition } = review;
  const { title } = edition;

  return (
    <div>
      <CustomHead title={`review of ${title}`} description={body} />
      <div>
        <div>
          <b>{title}</b>
        </div>
        <Authors authors={edition.book.authors} />
        <div>{body}</div>
      </div>
    </div>
  );
};

export default Review;
