import React from 'react';
import type { ByAuthorsFragment } from 'lib/generated/graphql';
import { Authors } from '..';

export interface IByAuthors {
  authors: ByAuthorsFragment['authors'];
  className?: string;
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
