'use client';

import Link from 'next/link';
import { Schedule } from '../../../types/schedule';
import ScheduleCard from '@/components/ScheduleCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorAlert from '@/components/ErrorAlert';
import { useSchedule } from '@/hooks/useSchedule';

export default function ReservationPage() {
  const { schedules, loading, error, fetchSchedules } = useSchedule();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            운동 일정
          </h1>
          <p className="text-lg text-gray-600">
            함께 운동할 친구를 찾아보세요
          </p>
        </div>
        <Link 
          href="/board/reservation/create"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          일정 등록하기
        </Link>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorAlert message={error} onRetry={fetchSchedules} />
      ) : schedules.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-gray-500">예정된 운동 일정이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedules.map((schedule: Schedule) => (
            <ScheduleCard key={schedule.id} schedule={schedule} />
          ))}
        </div>
      )}
    </div>
  );
} 