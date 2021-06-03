import { ReactNode, useState } from 'react';
import cn from 'classnames';

interface IEllipsisConfig {
  rows?: 1 | 5;
  expandable?: boolean;
}

export interface IParagraph {
  className?: string;
  children: ReactNode;
  ellipsis?: IEllipsisConfig | boolean;
}

interface IExtendedEllipsisConfig extends IEllipsisConfig {
  active: boolean;
}

const getEllipsisConfig = (prop: IParagraph['ellipsis']): IExtendedEllipsisConfig => {
  const defaultConfig: IExtendedEllipsisConfig = { rows: 1, expandable: false, active: false };
  if (typeof prop === 'object') {
    return { ...defaultConfig, ...prop, active: true };
  } else if (typeof prop === 'boolean') {
    return { ...defaultConfig, active: true };
  } else return defaultConfig;
};

const getLineClampCN = (config: IExtendedEllipsisConfig, expanded: boolean): string | undefined => {
  if (!config.active || expanded) return undefined;
  else if (config.rows === 1) return 'line-clamp-1';
  else if (config.rows === 5) return 'line-clamp-5';
};

export const Paragraph: React.FC<IParagraph> = ({ className, children, ellipsis }) => {
  const [expanded, setExpanded] = useState(false);
  const eConfig = getEllipsisConfig(ellipsis);

  return (
    <div>
      <span className={cn(getLineClampCN(eConfig, expanded), className)}>{children}</span>
      {eConfig.expandable && (
        <button
          aria-expanded={expanded}
          className={cn(
            expanded && 'ml-2',
            'text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded-full'
          )}
          onClick={() => setExpanded(expanded => !expanded)}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
};
