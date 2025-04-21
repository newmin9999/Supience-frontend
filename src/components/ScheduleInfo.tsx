import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import Logo from './Logo';
import { Schedule } from '@/types/schedule';

interface ScheduleInfoProps {
  schedule: Schedule;
  isParticipating: boolean;
  onParticipate: () => void;
}

export default function ScheduleInfo({
  schedule,
  isParticipating,
  onParticipate
}: ScheduleInfoProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div className="flex items-center gap-4 mb-6">
        <Logo />
        <h1 className="text-3xl font-bold text-gray-900">
          {schedule.title}
        </h1>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center text-gray-600">
          <FaCalendarAlt className="mr-3" />
          {schedule.date}
        </div>
        <div className="flex items-center text-gray-600">
          <FaClock className="mr-3" />
          {schedule.time}
        </div>
        <div className="flex items-center text-gray-600">
          <FaMapMarkerAlt className="mr-3" />
          {schedule.location}
        </div>
        <div className="flex items-center text-gray-600">
          <FaUsers className="mr-3" />
          {schedule.currentParticipants}/{schedule.maxParticipants}명 참여
        </div>
      </div>

      <p className="text-gray-700 mb-6">
        {schedule.description}
      </p>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          작성자: {schedule.createdBy}
        </div>
        <button
          onClick={onParticipate}
          disabled={isParticipating || schedule.currentParticipants >= schedule.maxParticipants}
          className={`px-6 py-2 rounded-lg ${
            isParticipating || schedule.currentParticipants >= schedule.maxParticipants
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isParticipating ? '참여 신청 완료' : '참여하기'}
        </button>
      </div>
    </div>
  );
} 