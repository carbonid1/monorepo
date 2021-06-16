import { CollectionIcon } from '@heroicons/react/solid';
import { BaseBlock, IBaseBlock } from 'components/@layout/BaseBlock';
import type { ReactNode } from 'react';
import { Skeleton } from '../Skeleton';
import cn from 'classnames';

export interface ILoadingContent extends Pick<IBaseBlock, 'subTitle' | 'title'> {
  className?: string;
  loading: boolean;
  empty: boolean;
  loader?: ReactNode;
  initiallyLoaded: boolean;
}

export const LoadingContent: React.FC<ILoadingContent> = ({
  empty,
  title,
  loader,
  loading,
  subTitle,
  children,
  className,
  initiallyLoaded,
}) => {
  return (
    <div className={cn(loading && 'animate-pulse', className)}>
      {loading && !initiallyLoaded ? (
        loader || <Skeleton />
      ) : empty ? (
        <BaseBlock title={title} subTitle={subTitle} img={<CollectionIcon className="h-40 text-blue-300" />} />
      ) : (
        children
      )}
    </div>
  );
};
