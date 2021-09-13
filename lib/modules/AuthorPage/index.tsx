import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/client';
import { CustomHead } from 'lib/components/CustomHead';
import { ROUTE } from 'lib/consts/routes';
import { TextLink } from 'lib/components';
import { extractIdFromSlug } from 'lib/utils';
import { Paragraph } from 'lib/components/@typography/Paragraph';
import { CoverImage } from 'lib/components/CoverImage';
import { NotFound, ServerError } from 'lib/components/@errors';
import { initializeApollo } from 'lib/apollo';
import gg from 'lib/generated';

interface IAuthorPage {
  id: string;
}

const AuthorPage: NextPage<IAuthorPage> = ({ id }) => {
  const { data, loading, error } = gg.useAuthorPageAuthor({ variables: { id }, skip: !id });
  const { author } = data ?? {};

  if (loading) return null;
  if (error) return <ServerError />;
  if (!author) return <NotFound />;

  const { fullName, books, imageUrl, bio } = author;

  return (
    <div>
      <CustomHead title={fullName} />
      <div className="grid justify-start gap-10 sm:grid-flow-col">
        <CoverImage alt={fullName} src={imageUrl} className="justify-self-center" />
        <div>
          <div>
            <b>Name: </b>
            {fullName}
          </div>
          {bio && <p>{bio}</p>}
          <ul>
            {books.map(({ editions, id }, index) => {
              const { title, description, id: editionId } = editions[0];
              return (
                <li key={id + index} className="my-2">
                  <TextLink path={`/${ROUTE.book}/${editionId}`} slug={title}>
                    {title}
                  </TextLink>
                  <Paragraph ellipsis={{ rows: 5, expandable: false }}>{description}</Paragraph>
                </li>
              );
            })}
          </ul>
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
    query: gg.AuthorPageAuthorDocument,
    variables: { id },
  });

  return {
    props: {
      id,
      session: await getSession(ctx),
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default AuthorPage;
