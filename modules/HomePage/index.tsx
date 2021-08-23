import { ROUTE } from 'consts/routes';
import { Link } from 'components/@controls/Link';
import { Authors } from 'components/Authors';
import { useIndexPage_BooksQuery } from 'generated/graphql';
import { ServerError } from 'components/@errors';

export default function HomePage() {
  const { data, error } = useIndexPage_BooksQuery();
  const { books = [] } = data ?? {};

  if (error) return <ServerError />;

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
}
