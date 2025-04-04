'use client';
import React from 'react';
import { FaBullhorn, FaComments, FaQuestionCircle, FaCalendarAlt } from 'react-icons/fa';
import BoardCard from '@/components/BoardCard';

const boards = [
  {
    href: '/board/notices',
    icon: FaBullhorn,
    title: '공지사항',
    description: '중요한 공지사항을 확인하세요',
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    href: '/board/free',
    icon: FaComments,
    title: '자유게시판',
    description: '자유로운 의견을 나눠보세요',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    href: '/board/qna',
    icon: FaQuestionCircle,
    title: 'Q&A',
    description: '질문과 답변을 주고받으세요',
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    href: '/board/reservation',
    icon: FaCalendarAlt,
    title: '운동 예약',
    description: '운동 시간을 예약하세요',
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            게시판 목록
          </h1>
          <p className="text-lg text-gray-600">
            원하시는 게시판을 선택해주세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {boards.map((board) => (
            <BoardCard
              key={board.href}
              href={board.href}
              icon={board.icon}
              title={board.title}
              description={board.description}
              iconColor={board.iconColor}
              bgColor={board.bgColor}
            />
          ))}
        </div>
      </div>
    </main>
  );
} 