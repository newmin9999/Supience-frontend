import React from 'react';
import Link from 'next/link';
import { FaCalendarAlt, FaClock, FaUsers } from 'react-icons/fa';
import { Schedule } from '../types/schedule';

interface ScheduleCardProps {
  schedule: Schedule;
}

export default function ScheduleCard({ schedule }: ScheduleCardProps) {
  return (
    <Link href={`/board/reservation/${schedule.id}`}>
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {schedule.title}
        </h2>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="mr-2" />
            {new Date(schedule.startTime).toLocaleDateString()}
          </div>
          <div className="flex items-center text-gray-600">
            <FaClock className="mr-2" />
            {new Date(schedule.startTime).toLocaleTimeString()} - {new Date(schedule.endTime).toLocaleTimeString()}
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
          <span className="text-blue-500">
            {schedule.currentParticipants < schedule.maxParticipants ? '참여 가능' : '마감'}
          </span>
        </div>
      </div>
    </Link>
  );
} 