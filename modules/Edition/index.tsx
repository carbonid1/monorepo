import { CoverImage } from 'components/CoverImage';
import cn from 'classnames';
import languageService from 'services/language.service';
import { formatDate } from 'lib/utils';
import { ByAuthors, IByAuthors } from 'components/Authors/ByAuthors';
import { Paragraph } from 'components/@typography/Paragraph';
import type { Edition as GEdition } from 'generated/graphql';

interface IEdition extends Pick<GEdition, 'title' | 'description' | 'publishedIn' | 'lang' | 'cover'> {
  book: {
    authors: IByAuthors['authors'];
  };
}

export interface IEditionProps {
  className?: string;
  edition: IEdition;
}

export const Edition: React.FC<IEditionProps> = ({ className, edition }) => {
  const { title, description, publishedIn, book, lang, cover } = edition;

  return (
    <div className={cn('grid justify-start grid-flow-col gap-x-10', className)}>
      <CoverImage src={cover} alt={title} className="row-span-6" />
      <div>
        <div>
          <b>{title}</b>
        </div>
        <ByAuthors authors={book.authors} />
        {publishedIn && (
          <div>
            <b>Date Published: </b>
            {formatDate(publishedIn)}
          </div>
        )}
        {lang && (
          <div>
            <b>Edition Language: </b>
            {languageService.getName(lang)}
          </div>
        )}
        {description && <Paragraph ellipsis={{ rows: 5 }}>{description}</Paragraph>}
      </div>
    </div>
  );
};
