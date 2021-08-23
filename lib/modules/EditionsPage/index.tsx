import { CustomHead } from 'lib/components/CustomHead';
import { ROUTE } from 'lib/consts/routes';
import { Link } from 'lib/components/@controls/Link';
import { extractIdFromSlug, formatDate } from 'lib/utils';
import languageService from 'lib/services/language.service';
import { ByAuthors } from 'lib/components/Authors/ByAuthors';
import {
  EditionsPage_BookDocument,
  EditionsPage_BookQuery,
  EditionsPage_BookQueryVariables,
  useEditionsPage_BookQuery,
} from 'lib/generated/graphql';
import { NotFound, ServerError } from 'lib/components/@errors';
import type { GetServerSideProps, NextPage } from 'next';
import { initializeApollo } from 'lib/apollo';

interface IEditionsPage {
  id: string;
}

const EditionsPage: NextPage<IEditionsPage> = ({ id }) => {
  const { data, error } = useEditionsPage_BookQuery({ variables: { id } });
  const { book } = data ?? {};

  if (error) return <ServerError />;
  if (!book) return <NotFound />;

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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const slug = query.slug as string;
  const id = extractIdFromSlug(slug);

  const apolloClient = initializeApollo();
  await apolloClient.query<EditionsPage_BookQuery, EditionsPage_BookQueryVariables>({
    query: EditionsPage_BookDocument,
    variables: { id },
  });

  return {
    props: { initialApolloState: apolloClient.cache.extract(), id },
  };
};

export default EditionsPage;