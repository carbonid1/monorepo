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
    <div className="grid gap-4 place-items-center">
      <Image src={`/assets/errors/${status}.svg`} alt="a person scratching his head" width="252" height="294" />
      <div className="text-2xl">{title}</div>
      <div className="text-gray-400">{subTitle}</div>
      <Link href="/">
        <button className="bg-green-700 p-3 text-white hover:opacity-90 rounded-md">Back Home</button>
      </Link>
    </div>
  );
};
