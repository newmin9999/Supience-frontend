import { useState, useEffect } from 'react';
import { scheduleApi } from '@/api/schedule';
import { useAuth } from '@/contexts/AuthContext';
import { Schedule } from '@/types/schedule';

// 단일 일정 조회 훅
export const useSchedule = (scheduleId: string) => {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const scheduleData = await scheduleApi.getSchedule(scheduleId);
        setSchedule(scheduleData);
      } catch (error) {
        setError('일정을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [scheduleId]);

  // 사용자 ID는 서버에서 세션을 통해 관리되므로,
  // 클라이언트에서는 인증 상태만 확인
  const isParticipating = isAuthenticated && schedule?.participants?.includes('current-user-id');
  const canJoin = isAuthenticated && !isParticipating && (schedule?.participants?.length || 0) < (schedule?.maxParticipants || 0);

  return {
    schedule,
    loading,
    error,
    isParticipating,
    canJoin
  };
};

// 일정 목록 조회 훅
export const useScheduleList = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await scheduleApi.getSchedules();
      setSchedules(response.data || []);
      setError(null);
    } catch (error) {
      console.error('일정 목록 조회 실패:', error);
      setError('일정 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return {
    schedules,
    loading,
    error,
    fetchSchedules
  };
}; 