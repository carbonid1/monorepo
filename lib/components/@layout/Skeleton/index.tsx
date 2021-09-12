import $ from './styled';

export interface ISkeleton {
  className?: string;
}

export const Skeleton: React.FC<ISkeleton> = ({ className }) => {
  return <$.Root className={className} />;
};
