'use client';
import React from 'react';
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">게시판 목록</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Link href="/board/notice" className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">공지사항</h2>
          <p className="text-gray-600">중요한 공지사항을 확인하세요</p>
        </Link>
        
        <Link href="/board/free" className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">자유게시판</h2>
          <p className="text-gray-600">자유로운 의견을 나눠보세요</p>
        </Link>
        
        <Link href="/board/qna" className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Q&A</h2>
          <p className="text-gray-600">질문과 답변을 주고받으세요</p>
        </Link>
      </div>
    </main>
  );
} 