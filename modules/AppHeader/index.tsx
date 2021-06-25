import Link from 'next/link';
import React from 'react';

export const AppHeader: React.FC = () => {
  return (
    <div className="sticky top-0 flex items-center w-full h-16 p-8 bg-blue-600 bg-opacity-50 backdrop-filter backdrop-blur z-header justify-items-center">
      <Link href="/">
        <a className="text-3xl font-bold text-white">BookHub</a>
      </Link>
    </div>
  );
};
