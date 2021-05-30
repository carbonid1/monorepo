import React from 'react';
import type { IAuthor } from 'types/interfaces';
import { Authors } from '..';

export interface IByAuthors {
  className?: string;
  authors: IAuthor[];
}
export const ByAuthors: React.FC<IByAuthors> = ({ className, authors }) => {
  if (!authors.length) return null;

  return (
    <div className={className}>
      <span className="mr-1">by</span>
      <Authors authors={authors} />
    </div>
  );
};
