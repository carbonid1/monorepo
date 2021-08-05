import { withApollo } from 'apollo/client';
import { ROUTE } from 'consts/routes';
import { Link } from 'components/@controls/Link';
import { Authors } from 'components/Authors';
import { Errors } from 'components/@errors';
import { useIndexPage_BooksQuery } from 'generated/graphql';

const Home: React.FC = () => {
  const { data, error } = useIndexPage_BooksQuery();
  const { books = [] } = data ?? {};

  if (error) return <Errors.ServerError />;
  return (
    <ul>
      {books.map(({ id, authors, editions }, index) => (
        <li key={id + index}>
          <Authors authors={authors} lastAuthorSuffix=": " />
          <Link path={`/${ROUTE.book}/${editions[0].id}`} slug={editions[0].title}>
            {editions[0].title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default withApollo(Home);
