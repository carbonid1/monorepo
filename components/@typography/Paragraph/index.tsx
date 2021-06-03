import type { ReactNode } from 'react';
import cn from 'classnames';
import hooks, { TParagraphEllipsis } from './hooks';

export interface IParagraph {
  className?: string;
  children: ReactNode;
  ellipsis: TParagraphEllipsis;
}

export const Paragraph: React.FC<IParagraph> = ({ className, children, ellipsis }) => {
  const { lineClampClassName, paragraphRef, expanded, isActive, onExpand } = hooks.useEllipsis(ellipsis);

  return (
    <div className="max-w-prose">
      <p className={cn(lineClampClassName, className)} ref={paragraphRef}>
        {children}
      </p>
      {isActive && (
        <button
          onClick={onExpand}
          aria-expanded={expanded}
          className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded-full"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
};
