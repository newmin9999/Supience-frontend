import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { scheduleApi } from '@/api/schedule';
import { CreateScheduleRequest } from '@/types/schedule';
import { INITIAL_FORM_DATA } from '@/constants/schedule';

export const useScheduleForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const scheduleData: CreateScheduleRequest = {
        title: formData.title,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        maxParticipants: formData.maxParticipants,
        description: formData.description,
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

  return {
    formData,
    loading,
    error,
    handleSubmit,
    handleChange,
  };
}; 