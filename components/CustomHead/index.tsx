import React from 'react';
import Head from 'next/head';

interface ICustomHead {
  title?: string;
}
export const CustomHead: React.FC<ICustomHead> = ({ title }) => {
  return (
    <Head>
      <title key="title">{title} - BookHub</title>
    </Head>
  );
};
