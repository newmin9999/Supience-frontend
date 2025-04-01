'use client';

import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="inline-block">
      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200">
        S
      </div>
    </Link>
  );
} 