import type { IEdition } from 'types/interfaces';
import cn from 'classnames';

export interface IEditionCover extends Pick<IEdition, 'cover' | 'title'> {
  className?: string;
}

export const EditionCover: React.FC<IEditionCover> = ({ cover, title, className }) => {
  return <img src={cover} alt={title} className={cn('bg-blue-300 h-56 w-40', className)} />;
};
