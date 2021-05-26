import type { IEdition } from 'types/interfaces';

export interface IEditionCover extends Pick<IEdition, 'cover' | 'title'> {}

export const EditionCover: React.FC<IEditionCover> = ({ cover, title }) => {
  return <img src={cover} alt={title} className="bg-blue-300 h-56 w-40" />;
};
