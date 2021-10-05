import type { GetServerSideProps, NextPage } from 'next';
import { CustomHead } from 'lib/components/CustomHead';
import { Authors } from 'lib/components/Authors';
import { initializeApollo } from 'lib/apollo';
import { ServerError } from 'lib/components/@errors/ServerError';
import { NotFound } from 'lib/components/@errors/NotFound';
import gg from 'lib/generated';

interface IReview {
  id: string;
}

const Review: NextPage<IReview> = ({ id }) => {
  const { data, error } = gg.useReviewPageReview({ variables: { id } });
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
  await apolloClient.query({
    query: gg.ReviewPageReviewDocument,
    variables: { id },
  });

  return {
    props: {
      id,
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default Review;
