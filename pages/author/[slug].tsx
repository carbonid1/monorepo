import { useRouter } from 'next/router';
import { withApollo } from 'apollo/client';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { NotFound } from 'components/errors/NotFound';
import NextLink from 'next/link';
import type { IAuthor } from 'types/interfaces';
import { BaseError } from 'components/errors/BaseError';
import { CustomHead } from 'components/CustomHead';
import { ROUTE } from 'consts/routes';
import { Button } from 'components/controls/Button';
import { Link } from 'components/controls/Link';

interface IAuthorQData {
  author: IAuthor;
}
interface IAuthorQVars extends Pick<IAuthor, 'slug'> {}

const AuthorQ = gql`
  query AuthorQ($slug: String!) {
    author(slug: $slug) {
      fullName
      slug
      books {
        title
        description
        slug
      }
    }
  }
`;

const Book: React.FC = () => {
  const slug = useRouter().query.slug as string;
  const { data, loading, error } = useQuery<IAuthorQData, IAuthorQVars>(AuthorQ, { variables: { slug } });
  const { author } = data ?? {};

  if (loading) return null;
  if (error) return <BaseError />;
  if (!author) return <NotFound />;

  const { fullName, books } = author;

  return (
    <div>
      <CustomHead title={fullName} />
      <div>
        <div>
          <b>Name: </b>
          {fullName}
        </div>
        <ul>
          {books.map((book, index) => (
            <li key={book.slug + index}>
              <Link href={`/${ROUTE.book}/${book.slug}`}>{book.title}</Link>
              <div>{book.description}</div>
            </li>
          ))}
        </ul>
      </div>
      <NextLink href="/">
        <Button>Back Home</Button>
      </NextLink>
    </div>
  );
};

export default withApollo(Book);
