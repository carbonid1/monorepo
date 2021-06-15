import type { IEdition } from 'types/interfaces';
import cn from 'classnames';
import { motion } from 'framer-motion';

export interface IEditionCover extends Pick<IEdition, 'cover' | 'title'> {
  className?: string;
}

export const EditionCover: React.FC<IEditionCover> = ({ cover, title, className }) => {
  return (
    <motion.img
      src={cover}
      alt={title}
      whileTap={{ scale: 2, x: '50%', y: '50%' }}
      className={cn('cursor-pointer w-40 z-1 object-contain', className)}
    />
  );
};
