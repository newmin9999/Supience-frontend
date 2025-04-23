'use client';
import React from 'react';
import { FaBullhorn, FaComments, FaQuestionCircle, FaCalendarAlt } from 'react-icons/fa';
import BoardCard from '@/components/BoardCard';
import Logo from '@/components/Logo';
import AuthButtons from '@/components/AuthButtons';
const boards = [
  {
    href: '/board/notices',
    icon: FaBullhorn,
    title: '공지사항',
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    href: '/board/free',
    icon: FaComments,
    title: '자유게시판',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    href: '/board/qna',
    icon: FaQuestionCircle,
    title: 'Q&A',
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    href: '/board/reservation',
    icon: FaCalendarAlt,
    title: '운동 예약',
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-10">
          <Logo size="xl" />
          <div className="flex flex-col items-end space-y-2">
            <AuthButtons />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {boards.map((board) => (
            <BoardCard
              key={board.href}
              href={board.href}
              icon={board.icon}
              title={board.title}
              iconColor={board.iconColor}
              bgColor={board.bgColor}
            />
          ))}
        </div>
      </div>
    </main>
  );
} 