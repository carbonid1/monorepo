import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface IBaseError {
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  status?: 404 | 500;
}

export const BaseError: React.FC<IBaseError> = ({
  title = '500',
  subTitle = 'Sorry, something went wrong.',
  status = 500,
}) => {
  return (
    <div style={{ display: 'grid', gap: 24, placeItems: 'center' }}>
      <Image src={`/assets/errors/${status}.svg`} alt="a person scratching his head" width="252" height="294" />
      <div>{title}</div>
      <div>{subTitle}</div>
      <Link href="/">
        <button>Back Home</button>
      </Link>
    </div>
  );
};
