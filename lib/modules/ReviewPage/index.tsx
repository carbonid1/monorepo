import { CustomHead } from 'lib/components/CustomHead';
import { Authors } from 'lib/components/Authors';
import {
  ReviewPage_ReviewDocument,
  ReviewPage_ReviewQuery,
  ReviewPage_ReviewQueryVariables,
  useReviewPage_ReviewQuery,
} from 'lib/generated/graphql';
import { NotFound, ServerError } from 'lib/components/@errors';
import type { GetServerSideProps, NextPage } from 'next';
import { initializeApollo } from 'lib/apollo';
import { getSession } from 'next-auth/client';

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

export const getServerSideProps: GetServerSideProps = async ctx => {
  const id = ctx.query.id as string;

  const apolloClient = initializeApollo();
  await apolloClient.query<ReviewPage_ReviewQuery, ReviewPage_ReviewQueryVariables>({
    query: ReviewPage_ReviewDocument,
    variables: { id },
  });

  return {
    props: {
      id,
      session: await getSession(ctx),
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default Review;
