import { useRouter } from 'next/router';
import { withApollo } from '../../apollo/client';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { NotFound } from '../../components/NotFound';

const BookQ = gql`
  query BookQ($bookId: Int!) {
    book(bookId: $bookId) {
      id
      title
      publishedIn
      author
    }
  }
`;

const Book: React.FC = () => {
  const bookId = Number(useRouter().query.slug);
  const { loading, error, data } = useQuery(BookQ, { variables: { bookId } });
  const { book } = data ?? {};

  if (loading) return null;
  if (error) return null;
  if (!book) return <NotFound />;

  return (
    <div>
      {book.id}
      {book.title}
      {book.publishedIn}
      {book.author}
    </div>
  );
};

export default withApollo(Book);
