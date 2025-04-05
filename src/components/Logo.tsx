'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/logo.ai"
        alt="Supience Logo"
        width={40}
        height={40}
        className="mr-2"
      />
      <span className="text-xl font-bold text-gray-900">Supience</span>
    </Link>
  );
} 