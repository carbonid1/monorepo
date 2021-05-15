import React from 'react';
import type { IAuthor } from 'types/interfaces';
import { Link } from 'components/@controls/Link';
import { ROUTE } from 'consts/routes';

export interface IAuthors {
  authors: IAuthor[];
  lastAuthorSuffix?: string;
}

const isLastAuthor = (length: number, index: number) => length - 1 === index;

export const Authors: React.FC<IAuthors> = ({ authors = [], lastAuthorSuffix = '' }) => {
  return (
    <>
      {authors.map(({ fullName, id }, index) => (
        <span key={id}>
          <Link path={`/${ROUTE.author}/${id}`} slug={fullName}>
            {fullName}
          </Link>
          {isLastAuthor(authors.length, index) ? lastAuthorSuffix : ', '}
        </span>
      ))}
    </>
  );
};
