'use client';

import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 md:w-14 md:h-14',
    md: 'w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20',
    lg: 'w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28',
    xl: 'w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40'
  };

  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/logo.png"
        alt="Supience Logo"
        width={160}
        height={160}
        className={`${sizeClasses[size]} mr-2`}
        style={{ objectFit: 'contain' }}
      />
    </Link>
  );
} 