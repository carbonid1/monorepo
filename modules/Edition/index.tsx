import { Authors } from 'components/Authors';
import type { IEdition } from 'types/interfaces';

export interface IEditionProps {
  className?: string;
  edition: IEdition;
}

export const Edition: React.FC<IEditionProps> = ({ className, edition }) => {
  const { title, description, publishedIn, book, lang } = edition;

  return (
    <div className={className}>
      <div>
        <b>Title: </b>
        {title}
      </div>
      {publishedIn && (
        <div>
          <b>Date Published: </b>
          {publishedIn}
        </div>
      )}
      {lang && (
        <div>
          <b>Edition Language: </b>
          {lang}
        </div>
      )}
      <Authors authors={book.authors} />
      {description && <div>{description}</div>}
    </div>
  );
};
