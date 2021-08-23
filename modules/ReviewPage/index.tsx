import { CustomHead } from 'components/CustomHead';
import { Authors } from 'components/Authors';
import {
  ReviewPage_ReviewDocument,
  ReviewPage_ReviewQuery,
  ReviewPage_ReviewQueryVariables,
  useReviewPage_ReviewQuery,
} from 'generated/graphql';
import { NotFound, ServerError } from 'components/@errors';
import type { GetServerSideProps, NextPage } from 'next';
import { initializeApollo } from 'lib/apollo';

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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id as string;

  const apolloClient = initializeApollo();
  await apolloClient.query<ReviewPage_ReviewQuery, ReviewPage_ReviewQueryVariables>({
    query: ReviewPage_ReviewDocument,
    variables: { id },
  });

  return {
    props: { initialApolloState: apolloClient.cache.extract(), id },
  };
};

export default Review;
