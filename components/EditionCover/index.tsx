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
      whileTap={{ scale: 2, x: '50%', y: '50%', animationDelay: '6s' }}
      className={cn('bg-blue-300 cursor-pointer h-56 w-40 rounded-2xl', className)}
    />
  );
};
