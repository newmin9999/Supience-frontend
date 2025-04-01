'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaComments, FaUser, FaClock, FaThumbsUp, FaComment } from 'react-icons/fa';
import Logo from '@/components/Logo';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
  comments: number;
}

const mockPosts: Post[] = [
  {
    id: '1',
    title: '오늘 운동 어떠셨나요?',
    content: '저는 오늘 헬스장에서 가슴 운동을 했는데, 정말 좋았습니다!',
    author: '김철수',
    createdAt: '2024-03-30 15:30',
    likes: 12,
    comments: 5
  },
  {
    id: '2',
    title: '운동 추천해주세요',
    content: '초보자도 할 수 있는 운동 추천해주세요.',
    author: '이영희',
    createdAt: '2024-03-30 14:20',
    likes: 8,
    comments: 10
  },
  {
    id: '3',
    title: '운동 다이어트 성공 후기',
    content: '3개월 동안 꾸준히 운동한 결과 10kg 감량 성공했습니다!',
    author: '박지성',
    createdAt: '2024-03-30 13:00',
    likes: 25,
    comments: 15
  }
];

export default function FreeBoardPage() {
  const [posts] = useState<Post[]>(mockPosts);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Logo />
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              자유게시판
            </h1>
            <p className="text-lg text-gray-600">
              자유로운 의견을 나눠보세요
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {posts.map((post) => (
              <Link key={post.id} href={`/board/free/${post.id}`}>
                <div className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {post.title}
                    </h2>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaClock className="mr-1" />
                      {post.createdAt}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaUser className="mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <FaThumbsUp className="mr-1" />
                        {post.likes}
                      </div>
                      <div className="flex items-center">
                        <FaComment className="mr-1" />
                        {post.comments}
                      </div>
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