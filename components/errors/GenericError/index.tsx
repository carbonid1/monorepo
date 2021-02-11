import React from 'react';
import { BaseError } from '../BaseError';

export const GenericError: React.FC = () => {
  return <BaseError status="error" subTitle="Sorry, something went wrong." />;
};
