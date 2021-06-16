import { CollectionIcon, RefreshIcon } from '@heroicons/react/solid';
import { BaseBlock, IBaseBlock } from 'components/@layout/BaseBlock';

export interface ILoadingContent extends Pick<IBaseBlock, 'subTitle' | 'title'> {
  className?: string;
  loading: boolean;
  empty: boolean;
}

export const LoadingContent: React.FC<ILoadingContent> = ({ className, loading, empty, children, subTitle, title }) => {
  return (
    <div className={className}>
      {loading ? (
        <div className="flex items-center justify-center">
          <RefreshIcon className="h-40" />
        </div>
      ) : empty ? (
        <BaseBlock title={title} subTitle={subTitle} img={<CollectionIcon className="h-40 text-blue-300" />} />
      ) : (
        children
      )}
    </div>
  );
};
