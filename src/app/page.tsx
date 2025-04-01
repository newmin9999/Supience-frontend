'use client';
import React from 'react';
import Link from 'next/link';
import { FaBullhorn, FaComments, FaQuestionCircle, FaCalendarAlt } from 'react-icons/fa';

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
          {/* 공지사항 */}
          <Link href="/board/notices" className="group">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                <FaBullhorn className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">공지사항</h2>
              <p className="text-gray-600">중요한 공지사항을 확인하세요</p>
            </div>
          </Link>

          {/* 자유게시판 */}
          <Link href="/board/free" className="group">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 group-hover:bg-green-200 transition-colors duration-300">
                <FaComments className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">자유게시판</h2>
              <p className="text-gray-600">자유로운 의견을 나눠보세요</p>
            </div>
          </Link>

          {/* Q&A */}
          <Link href="/board/qna" className="group">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                <FaQuestionCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Q&A</h2>
              <p className="text-gray-600">질문과 답변을 주고받으세요</p>
            </div>
          </Link>

          {/* 운동 예약 */}
          <Link href="/board/reservation" className="group">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4 group-hover:bg-orange-200 transition-colors duration-300">
                <FaCalendarAlt className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">운동 예약</h2>
              <p className="text-gray-600">운동 시간을 예약하세요</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
} 