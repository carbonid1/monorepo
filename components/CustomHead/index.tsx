import React from 'react';
import Head from 'next/head';

interface ICustomHead {
  title?: string;
  description?: string;
}
export const CustomHead: React.FC<ICustomHead> = ({ title, description }) => {
  return (
    <Head>
      <title key="title">{title} - BookHub</title>
      {description && <meta name="description" key="description" content={description} />}
    </Head>
  );
};
