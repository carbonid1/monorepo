import { useRouter } from 'next/router';
import { withApollo } from 'apollo/client';
import { CustomHead } from 'components/CustomHead';
import { ROUTE } from 'consts/routes';
import { Link } from 'components/@controls/Link';
import { extractIdFromSlug, formatDate } from 'lib/utils';
import languageService from 'services/language.service';
import { ByAuthors } from 'components/Authors/ByAuthors';
import { Errors } from 'components/@errors';
import { useEditionsPage_BookQuery } from 'generated/graphql';

const Book: React.FC = () => {
  const slug = useRouter().query.slug as string;
  const id = extractIdFromSlug(slug);
  const { data, loading, error } = useEditionsPage_BookQuery({ variables: { id } });
  const { book } = data ?? {};

  if (loading) return null;
  if (error) return <Errors.ServerError />;
  if (!book) return <Errors.NotFound />;

  const { editions, publishedIn, authors } = book;
  const { title, description } = editions[0];

  return (
    <div>
      <CustomHead title={title} description={description} />
      <div>
        <b>{title}</b>
        <ByAuthors authors={authors} />
        {publishedIn && <div>First published in {formatDate(publishedIn)}</div>}
        <div className="mt-2">
          {editions.map(edition => (
            <div key={edition.id} className="mb-2">
              <Link path={`/${ROUTE.book}/${edition.id}`} slug={edition.title}>
                {edition.title}
              </Link>
              <div>
                <b>Published in: </b>
                {formatDate(edition.publishedIn)}
              </div>
              {edition.lang && (
                <div>
                  <b>Edition language: </b>
                  {languageService.getName(edition.lang)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withApollo(Book);
