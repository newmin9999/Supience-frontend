'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaClock, FaComment, FaCheck } from 'react-icons/fa';
import Logo from '@/components/Logo';

interface Question {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  comments: number;
  isAnswered: boolean;
}

const mockQuestions: Question[] = [
  {
    id: '1',
    title: '헬스장 이용 시간 문의',
    content: '헬스장 이용 가능 시간이 어떻게 되나요?',
    author: '김철수',
    createdAt: '2024-03-30 15:30',
    comments: 2,
    isAnswered: true
  },
  {
    id: '2',
    title: 'PT 프로그램 문의',
    content: 'PT 프로그램 신청 방법과 가격을 알고 싶습니다.',
    author: '이영희',
    createdAt: '2024-03-30 14:20',
    comments: 1,
    isAnswered: false
  },
  {
    id: '3',
    title: '회원권 연장 문의',
    content: '회원권 연장은 어떻게 하나요?',
    author: '박지성',
    createdAt: '2024-03-30 13:00',
    comments: 0,
    isAnswered: false
  }
];

export default function QnAPage() {
  const [questions] = useState<Question[]>(mockQuestions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Logo />
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Q&A
            </h1>
            <p className="text-lg text-gray-600">
              궁금한 점을 물어보세요
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {questions.map((question) => (
              <Link key={question.id} href={`/board/qna/${question.id}`}>
                <div className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {question.title}
                      </h2>
                      {question.isAnswered && (
                        <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full flex items-center">
                          <FaCheck className="mr-1" />
                          답변완료
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaClock className="mr-1" />
                      {question.createdAt}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {question.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaUser className="mr-1" />
                      {question.author}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaComment className="mr-1" />
                      {question.comments}
                    </div>
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