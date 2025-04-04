'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { Schedule } from '../../../types/schedule';
import { getSchedules } from '../../../api/schedule';
import ScheduleCard from '@/components/ScheduleCard';

export default function ReservationPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await getSchedules();
        setSchedules(response.data);
      } catch (err) {
        setError('운동 일정을 불러오는데 실패했습니다.');
        console.error('Error fetching schedules:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

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

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">로딩 중...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-500">{error}</p>
          </div>
        ) : schedules.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">예정된 운동 일정이 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedules.map((schedule) => (
              <ScheduleCard key={schedule.id} schedule={schedule} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 