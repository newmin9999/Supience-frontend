'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Logo from '@/components/Logo';

interface WorkoutSchedule {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  description: string;
  createdBy: string;
}

const mockSchedules: WorkoutSchedule[] = [
  {
    id: '1',
    title: '조깅 모임',
    date: '2024-04-05',
    time: '07:00',
    location: '한강공원',
    maxParticipants: 10,
    currentParticipants: 3,
    description: '한강공원에서 함께 조깅하실 분을 모집합니다!',
    createdBy: '김철수'
  },
  {
    id: '2',
    title: '헬스장 PT',
    date: '2024-04-06',
    time: '19:00',
    location: '피트니스 센터',
    maxParticipants: 5,
    currentParticipants: 4,
    description: 'PT 트레이너와 함께 운동하실 분을 모집합니다.',
    createdBy: '이영희'
  },
  {
    id: '3',
    title: '테니스 모임',
    date: '2024-04-07',
    time: '14:00',
    location: '테니스장',
    maxParticipants: 8,
    currentParticipants: 6,
    description: '테니스 초보자도 환영합니다!',
    createdBy: '박지성'
  }
];

export default function ReservationPage() {
  const [schedules] = useState<WorkoutSchedule[]>(mockSchedules);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Logo />
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                운동 일정
              </h1>
              <p className="text-lg text-gray-600">
                함께 운동할 친구를 찾아보세요
              </p>
            </div>
          </div>
          <Link 
            href="/board/reservation/create"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            일정 등록하기
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedules.map((schedule) => (
            <Link key={schedule.id} href={`/board/reservation/${schedule.id}`}>
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {schedule.title}
                </h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="mr-2" />
                    {schedule.date}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaClock className="mr-2" />
                    {schedule.time}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2" />
                    {schedule.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaUsers className="mr-2" />
                    {schedule.currentParticipants}/{schedule.maxParticipants}명 참여
                  </div>
                </div>

                <p className="text-gray-600 mb-4">
                  {schedule.description}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>작성자: {schedule.createdBy}</span>
                  <span className="text-blue-500">
                    {schedule.currentParticipants < schedule.maxParticipants ? '참여 가능' : '마감'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 