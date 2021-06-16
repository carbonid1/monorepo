import React from 'react';
import { BaseError } from '../BaseError';
import Image from 'next/image';

export const ServerError: React.FC = () => {
  return (
    <BaseError
      title="500"
      subTitle="Sorry, we're experiencing technical issues."
      img={<Image src="/assets/errors/500.svg" alt="a person scratching his head" width="252" height="294" />}
    />
  );
};
