import { useRouter } from 'next/router';
import { withApollo } from 'apollo/client';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { NotFound } from 'components/@errors/NotFound';
import type { IReview } from 'types/interfaces';
import { BaseError } from 'components/@errors/BaseError';
import { CustomHead } from 'components/CustomHead';
import { Authors } from 'components/Authors';

interface IReviewQData {
  review: IReview;
}
interface IReviewQVars {
  id: number | null;
}

const ReviewQ = gql`
  query ReviewQ($id: ID) {
    review(id: $id) {
      body
      edition {
        title
        book {
          authors {
            fullName
            id
          }
        }
      }
    }
  }
`;

const Review: React.FC = () => {
  const id = Number(useRouter().query.id);
  const { data, loading, error } = useQuery<IReviewQData, IReviewQVars>(ReviewQ, { variables: { id } });
  const { review } = data ?? {};

  if (loading) return null;
  if (error) return <BaseError />;
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

export default withApollo(Review);
