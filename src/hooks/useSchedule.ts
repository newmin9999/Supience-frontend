import { useState, useEffect } from 'react';
import { scheduleApi } from '@/api/schedule';
import { Schedule, Comment } from '@/types/schedule';
import { useAuth } from '@/hooks/useAuth';

export function useSchedule(scheduleId?: string) {
  const { user } = useAuth();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isParticipating, setIsParticipating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await scheduleApi.getSchedules();
      setSchedules(response.data);
    } catch (err) {
      setError('운동 일정을 불러오는데 실패했습니다.');
      console.error('Error fetching schedules:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSchedule = async () => {
    if (!scheduleId) return;
    
    try {
      setLoading(true);
      setError(null);
      const [scheduleData, commentsData] = await Promise.all([
        scheduleApi.getSchedule(scheduleId),
        scheduleApi.getComments(scheduleId)
      ]);
      setSchedule(scheduleData);
      setComments(commentsData);
      setIsParticipating(scheduleData.participants.includes(user?.id || ''));
    } catch (err) {
      setError('데이터를 불러오는데 실패했습니다.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scheduleId) {
      fetchSchedule();
    } else {
      fetchSchedules();
    }
  }, [scheduleId]);

  const handleParticipate = async () => {
    if (!schedule) return;
    
    try {
      await scheduleApi.participateSchedule(schedule.id.toString());
      setIsParticipating(true);
      setSchedule(prev => prev ? {
        ...prev,
        currentParticipants: prev.currentParticipants + 1
      } : null);
    } catch (err) {
      setError('참여 신청에 실패했습니다.');
      console.error('Error participating:', err);
    }
  };

  const handleCommentSubmit = async (content: string) => {
    if (!content.trim() || !schedule) return false;

    try {
      const comment = await scheduleApi.createComment(schedule.id.toString(), {
        content
      });
      setComments(prev => [...prev, comment]);
      return true;
    } catch (err) {
      setError('댓글 작성에 실패했습니다.');
      console.error('Error creating comment:', err);
      return false;
    }
  };

  return {
    schedule,
    schedules,
    comments,
    isParticipating,
    loading,
    error,
    handleParticipate,
    handleCommentSubmit,
    fetchSchedules
  };
} 