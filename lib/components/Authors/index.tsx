import React from 'react';
import { Link } from 'lib/components/@controls/Link';
import { ROUTE } from 'lib/consts/routes';
import type { Author } from 'lib/generated/graphql';

type TAuthor = Pick<Author, 'fullName' | 'id'>;
export interface IAuthors {
  authors: TAuthor[];
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