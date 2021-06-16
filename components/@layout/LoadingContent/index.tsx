import { CollectionIcon, RefreshIcon } from '@heroicons/react/solid';

export interface ILoadingContent {
  className?: string;
  loading: boolean;
  empty: boolean;
}

export const LoadingContent: React.FC<ILoadingContent> = ({ className, loading, empty, children }) => {
  return (
    <div className={className}>
      {loading || empty ? (
        <div className="flex items-center justify-center">
          {loading ? <RefreshIcon className="h-40" /> : <CollectionIcon className="h-40" />}
        </div>
      ) : (
        children
      )}
    </div>
  );
};
