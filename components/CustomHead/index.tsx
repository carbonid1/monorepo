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
      {description && <meta name="description" key="description" content={truncateDescription(description)} />}
    </Head>
  );
};

const truncateDescription = (description: string) => {
  const maxLength = 152;
  return description.length <= maxLength ? description : description.substring(0, maxLength) + '...';
};
