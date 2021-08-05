import React from 'react';
import { Authors, IAuthors } from '..';

export interface IByAuthors extends Pick<IAuthors, 'authors'> {
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
