import { useRouter } from 'next/router';
import { withApollo } from '../../apollo/client';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { NotFound } from '../../components/NotFound';
import Link from 'next/link';

const BookQ = gql`
  query BookQ($slug: String!) {
    book(slug: $slug) {
      id
      title
      publishedIn
      author
    }
  }
`;

const Book: React.FC = () => {
  const slug = useRouter().query.slug;
  const { data, loading, error } = useQuery(BookQ, { variables: { slug } });
  const { book } = data ?? {};

  if (loading || error) return null;
  if (!book) return <NotFound />;

  return (
    <div>
      <div>
        {book.id}
        {book.title}
        {book.publishedIn}
        {book.author}
      </div>
      <Link href="/">Back Home</Link>
    </div>
  );
};

export default withApollo(Book);
