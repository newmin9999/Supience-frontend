'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import Logo from '@/components/Logo';
import FormInput, { FormInputProps } from '@/components/FormInput';
import { CreateScheduleRequest, scheduleApi } from '@/api/schedule';

export default function CreateSchedulePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    maxParticipants: 0 // 0은 제한 없음을 의미
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
        endTime: formData.endTime || formData.startTime,
        maxParticipants: formData.maxParticipants,
      };

      await scheduleApi.createSchedule(scheduleData);
      router.push('/board/reservation');
    } catch (err) {
      setError('일정 생성에 실패했습니다. 다시 시도해주세요.');
      console.error('Error creating schedule:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxParticipants' ? parseInt(value) : value
    }));
  };

  const formFields: FormInputProps[] = [
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
      label: '종료 시간 (선택)',
      name: 'endTime',
      type: 'datetime-local',
      value: formData.endTime,
      required: false,
      min: new Date().toISOString().slice(0, 16),
      icon: FaClock,
      placeholder: '종료 시간을 선택하지 않으면 시작 시간으로 설정됩니다',
    },
    {
      label: '최대 참여 인원',
      name: 'maxParticipants',
      type: 'select',
      value: formData.maxParticipants,
      required: true,
      icon: FaUsers,
      options: [
        { value: 0, label: '제한 없음' },
        ...Array.from({ length: 30 }, (_, i) => ({
          value: i + 1,
          label: `${i + 1}명`
        }))
      ]
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