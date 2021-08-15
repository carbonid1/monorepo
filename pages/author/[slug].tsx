import { useRouter } from 'next/router';
import { withApollo } from 'apollo/client';
import { CustomHead } from 'components/CustomHead';
import { ROUTE } from 'consts/routes';
import { Link } from 'components/@controls/Link';
import { extractIdFromSlug } from 'lib/utils';
import { Paragraph } from 'components/@typography/Paragraph';
import { CoverImage } from 'components/CoverImage';
import hooks from 'modules/author/hooks';
import { NotFound, ServerError } from 'components/@errors';

const Book: React.FC = () => {
  const slug = useRouter().query.slug as string;
  const id = extractIdFromSlug(slug);
  const { data, loading, error } = hooks.useAuthorQuery(id);
  const { author } = data ?? {};

  if (loading) return null;
  if (error) return <ServerError />;
  if (!author) return <NotFound />;

  const { fullName, books, imageUrl } = author;

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
          <ul>
            {books.map(({ editions, id }, index) => {
              const { title, description, id: editionId } = editions[0];
              return (
                <li key={id + index} className="my-2">
                  <Link path={`/${ROUTE.book}/${editionId}`} slug={title}>
                    {title}
                  </Link>
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

export default withApollo(Book);
