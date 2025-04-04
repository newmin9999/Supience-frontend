'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import Logo from '@/components/Logo';
import FormInput from '@/components/FormInput';
import { createSchedule, CreateScheduleRequest } from '@/api/schedule';

export default function CreateSchedulePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    maxParticipants: 2
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const scheduleData: CreateScheduleRequest = {
        title: formData.title,
        description: formData.description,
        startTime: formData.startTime,
        endTime: formData.endTime,
        maxParticipants: formData.maxParticipants,
      };

      await createSchedule(scheduleData);
      router.push('/board/reservation');
    } catch (err) {
      setError('일정 생성에 실패했습니다. 다시 시도해주세요.');
      console.error('Error creating schedule:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxParticipants' ? parseInt(value) : value
    }));
  };

  const formFields = [
    {
      label: '제목',
      name: 'title',
      type: 'text',
      value: formData.title,
      required: true,
    },
    {
      label: '시작 시간',
      name: 'startTime',
      type: 'datetime-local',
      value: formData.startTime,
      required: true,
      min: new Date().toISOString().slice(0, 16),
      icon: FaCalendarAlt,
    },
    {
      label: '종료 시간',
      name: 'endTime',
      type: 'datetime-local',
      value: formData.endTime,
      required: true,
      min: new Date().toISOString().slice(0, 16),
      icon: FaClock,
    },
    {
      label: '최대 참여 인원',
      name: 'maxParticipants',
      type: 'number',
      value: formData.maxParticipants,
      required: true,
      min: '2',
      icon: FaUsers,
    },
    {
      label: '설명',
      name: 'description',
      type: 'textarea',
      value: formData.description,
      required: true,
      rows: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            운동 일정 등록
          </h1>
          <p className="text-lg text-gray-600">
            함께 운동할 친구를 모집해보세요
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            {formFields.map((field) => (
              <FormInput
                key={field.name}
                {...field}
                onChange={handleChange}
              />
            ))}

            {/* 버튼 */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/board/reservation')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                취소
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? '등록 중...' : '등록하기'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 