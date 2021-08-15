import cn from 'classnames';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

export interface ICoverImage {
  className?: string;
  alt?: string;
  src?: string | null;
}

export const CoverImage: React.FC<ICoverImage> = ({ src, alt, className }) => {
  const [{ scale, x, y }, api] = useSpring(() => ({ scale: 1, x: '0%', y: '0%' }));
  const bind = useDrag(({ active }) =>
    api.start({
      to: {
        x: active ? '50%' : '0%',
        y: active ? '50%' : '0%',
        scale: active ? 2 : 1,
      },
    }),
  );

  return (
    <animated.img
      {...bind()}
      alt={alt}
      src={src || undefined}
      style={{ scale, x, y }}
      className={cn('cursor-pointer w-full sm:w-40 z-1 object-contain', className)}
    />
  );
};
