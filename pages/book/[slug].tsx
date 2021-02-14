import { useRouter } from 'next/router';
import { withApollo } from 'apollo/client';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { NotFound } from 'components/errors/NotFound';
import Link from 'next/link';
import type { IBook } from 'types/interfaces';
import { GenericError } from 'components/errors/GenericError';
import { CustomHead } from 'components/CustomHead';

interface IBookQData {
  book: IBook;
}
interface IBookQVars extends Pick<IBook, 'slug'> {}

const BookQ = gql`
  query BookQ($slug: String!) {
    book(slug: $slug) {
      id
      authors {
        fullName
      }
      description
      publishedIn
      title
    }
  }
`;

const Book: React.FC = () => {
  const slug = useRouter().query.slug as string;
  const { data, loading, error } = useQuery<IBookQData, IBookQVars>(BookQ, { variables: { slug } });
  const { book } = data ?? {};

  if (loading) return null;
  if (error) return <GenericError />;
  if (!book) return <NotFound />;

  return (
    <div>
      <CustomHead title={book.title} description={book.description} />
      <div>
        {book.id}
        {book.title}
        {book.publishedIn}
        {book.authors?.map(({ fullName }) => fullName).join(', ')}
        <div>{book.description}</div>
      </div>
      <Link href="/">Back Home</Link>
    </div>
  );
};

export default withApollo(Book);
