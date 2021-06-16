import React from 'react';
import { BaseError } from '../BaseError';
import Image from 'next/image';

export const NotFound: React.FC = () => {
  return (
    <BaseError
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      img={<Image src="/assets/errors/404.svg" alt="a person scratching his head" width="252" height="294" />}
    />
  );
};
