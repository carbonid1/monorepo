import { EditionCover } from 'components/EditionCover';
import type { IEdition } from 'types/interfaces';
import cn from 'classnames';
import languageService from 'services/language.service';
import formatDate from 'utils/formatDate';
import { ByAuthors } from 'components/Authors/ByAuthors';

export interface IEditionProps {
  className?: string;
  edition: IEdition;
}

export const Edition: React.FC<IEditionProps> = ({ className, edition }) => {
  const { title, description, publishedIn, book, lang, cover } = edition;

  return (
    <div className={cn('grid justify-start grid-flow-col gap-x-10', className)}>
      <EditionCover cover={cover} title={title} className="row-span-6" />
      <div className="">
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
        {description && <div className="max-w-prose">{description}</div>}
      </div>
    </div>
  );
};
