import React from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';

interface BoardCardProps {
  href: string;
  icon: IconType;
  title: string;
  iconColor: string;
  bgColor: string;
}

export default function BoardCard({
  href,
  icon: Icon,
  title,
  iconColor,
  bgColor,
}: BoardCardProps) {
  return (
    <Link href={href} className="group">
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className={`flex items-center justify-center w-12 h-12 ${bgColor} rounded-lg mb-4 group-hover:bg-opacity-80 transition-colors duration-300`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      </div>
    </Link>
  );
} 