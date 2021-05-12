import Link from 'next/link';
import React from 'react';

export const AppHeader: React.FC = () => {
  return (
    <div className="h-16 flex items-center justify-items-center p-8 w-full bg-gradient-to-b to-blue-600 from-green-500">
      <Link href="/">
        <a className="text-white text-3xl font-bold">BookHub</a>
      </Link>
    </div>
  );
};
