import type { GetServerSideProps, NextPage } from 'next';
import { CustomHead } from 'lib/components/CustomHead';
import { ROUTE } from 'lib/consts/routes';
import { TextLink } from 'lib/components';
import { extractIdFromSlug, formatDate } from 'lib/utils';
import languageService from 'lib/services/language.service';
import { ByAuthors } from 'lib/components/Authors/ByAuthors';
import { ServerError } from 'lib/components/@errors/ServerError';
import { NotFound } from 'lib/components/@errors/NotFound';
import { initializeApollo } from 'lib/apollo';
import gg from 'lib/generated';

interface IEditionsPage {
  id: string;
}

const EditionsPage: NextPage<IEditionsPage> = ({ id }) => {
  const { data, error } = gg.useEditionsPageBook({ variables: { id } });
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
              <TextLink path={`/${ROUTE.book}/${edition.id}`} slug={edition.title}>
                {edition.title}
              </TextLink>
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

export const getServerSideProps: GetServerSideProps = async ctx => {
  const slug = ctx.query.slug as string;
  const id = extractIdFromSlug(slug);

  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: gg.EditionsPageBookDocument,
    variables: { id },
  });

  return {
    props: {
      id,
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default EditionsPage;
