import cn from 'classnames';
import { motion } from 'framer-motion';

export interface ICoverImage {
  className?: string;
  alt?: string;
  src?: string;
}

export const CoverImage: React.FC<ICoverImage> = ({ src, alt, className }) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      whileTap={{ scale: 2, x: '50%', y: '50%' }}
      className={cn('cursor-pointer w-40 z-1 object-contain', className)}
    />
  );
};
