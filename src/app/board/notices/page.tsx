'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaBullhorn, FaUser, FaClock } from 'react-icons/fa';
import Logo from '@/components/Logo';

interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  isImportant: boolean;
}

const mockNotices: Notice[] = [
  {
    id: '1',
    title: '서비스 점검 안내',
    content: '2024년 4월 1일 새벽 2시부터 4시까지 서비스 점검이 있을 예정입니다.',
    author: '관리자',
    createdAt: '2024-03-30 14:30',
    isImportant: true
  },
  {
    id: '2',
    title: '이용약관 개정 안내',
    content: '2024년 4월 1일부터 적용되는 이용약관이 개정되었습니다.',
    author: '관리자',
    createdAt: '2024-03-29 10:00',
    isImportant: true
  },
  {
    id: '3',
    title: '신규 기능 안내',
    content: '새로운 기능이 추가되었습니다. 자세한 내용은 공지사항을 확인해주세요.',
    author: '관리자',
    createdAt: '2024-03-28 09:00',
    isImportant: false
  }
];

export default function NoticesPage() {
  const [notices] = useState<Notice[]>(mockNotices);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Logo />
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              공지사항
            </h1>
            <p className="text-lg text-gray-600">
              중요한 공지사항을 확인하세요
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {notices.map((notice) => (
              <Link key={notice.id} href={`/board/notices/${notice.id}`}>
                <div className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {notice.isImportant && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-sm rounded-full">
                          중요
                        </span>
                      )}
                      <h2 className="text-xl font-semibold text-gray-900">
                        {notice.title}
                      </h2>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaClock className="mr-1" />
                      {notice.createdAt}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {notice.content}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaUser className="mr-1" />
                    {notice.author}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 