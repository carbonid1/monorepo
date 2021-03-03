import Link from 'next/link';
import React from 'react';

export const AppHeader: React.FC = () => {
  return (
    <div className="h-16 flex items-center justify-items-center p-8 w-full bg-gradient-to-b to-pink-500 from-red-400">
      <Link href="/">
        <a className="text-white text-3xl font-bold">BookHub</a>
      </Link>
    </div>
  );
};
