import { useRouter } from 'next/router';
import { CustomHead } from 'components/CustomHead';
import { Authors } from 'components/Authors';
import { useReviewPage_ReviewQuery } from 'generated/graphql';
import { NotFound, ServerError } from 'components/@errors';

const Review: React.FC = () => {
  const id = useRouter().query.id as string;
  const { data, loading, error } = useReviewPage_ReviewQuery({ variables: { id } });
  const { review } = data ?? {};

  if (loading) return null;
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
