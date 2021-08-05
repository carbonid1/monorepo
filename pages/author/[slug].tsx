import { useRouter } from 'next/router';
import { withApollo } from 'apollo/client';
import { CustomHead } from 'components/CustomHead';
import { ROUTE } from 'consts/routes';
import { Link } from 'components/@controls/Link';
import extractIdFromSlug from 'utils/extractIdFromSlug';
import { Paragraph } from 'components/@typography/Paragraph';
import { CoverImage } from 'components/CoverImage';
import { Errors } from 'components/@errors';
import hooks from 'modules/author/hooks';

const Book: React.FC = () => {
  const slug = useRouter().query.slug as string;
  const id = extractIdFromSlug(slug);
  const { data, loading, error } = hooks.useAuthorQuery(id);
  const { author } = data ?? {};

  if (loading) return null;
  if (error) return <Errors.ServerError />;
  if (!author) return <Errors.NotFound />;

  const { fullName, books, imageUrl } = author;

  return (
    <div>
      <CustomHead title={fullName} />
      <div className="grid justify-start grid-flow-col gap-x-10">
        <CoverImage alt={fullName} src={imageUrl} />
        <div>
          <div>
            <b>Name: </b>
            {fullName}
          </div>
          <ul>
            {books.map(({ editions, id }, index) => {
              const { title, description, id: editionId } = editions[0];
              return (
                <li key={id + index}>
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
