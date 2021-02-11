import { Button, Result, ResultProps } from 'antd';
import React from 'react';
import Link from 'next/link';

export const BaseError: React.FC<ResultProps> = props => {
  return (
    <Result
      {...props}
      extra={
        <Link href="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
};
