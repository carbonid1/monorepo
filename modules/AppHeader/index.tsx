import Link from 'next/link';
import React from 'react';

export const AppHeader: React.FC = () => {
  return (
    <div className="h-16">
      <div className="fixed flex items-center w-full h-16 p-8 z-header justify-items-center bg-primary">
        <Link href="/">
          <a className="text-3xl font-bold text-white">BookHub</a>
        </Link>
      </div>
    </div>
  );
};
