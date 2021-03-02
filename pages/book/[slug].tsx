import { useRouter } from 'next/router';
import { withApollo } from 'apollo/client';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { NotFound } from 'components/errors/NotFound';
import NextLink from 'next/link';
import type { IBook } from 'types/interfaces';
import { BaseError } from 'components/errors/BaseError';
import { CustomHead } from 'components/CustomHead';
import { ROUTE } from 'consts/routes';
import { Button } from 'components/controls/Button';
import { Link } from 'components/controls/Link';

interface IBookQData {
  book: IBook;
}
interface IBookQVars extends Pick<IBook, 'slug'> {}

const BookQ = gql`
  query BookQ($slug: String!) {
    book(slug: $slug) {
      authors {
        fullName
        slug
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
  if (error) return <BaseError />;
  if (!book) return <NotFound />;

  return (
    <div>
      <CustomHead title={book.title} description={book.description} />
      <div>
        <div>
          <b>Title: </b>
          {book.title}
        </div>
        {book.publishedIn && (
          <div>
            <b>Date Published: </b>
            {book.publishedIn}
          </div>
        )}
        {book.authors?.map(({ fullName, slug }, index) => (
          <>
            <Link href={`/${ROUTE.author}/${slug}`}>{fullName}</Link>
            {book.authors.length - 1 === index ? '' : ', '}
          </>
        ))}
        {book.description && <div>{book.description}</div>}
      </div>
      <NextLink href="/">
        <Button>Back Home</Button>
      </NextLink>
    </div>
  );
};

export default withApollo(Book);
