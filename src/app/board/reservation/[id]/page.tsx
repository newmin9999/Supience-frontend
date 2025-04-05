'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ScheduleInfo from '@/components/ScheduleInfo';
import CommentSection from '@/components/CommentSection';
import { scheduleApi, WorkoutSchedule, Comment } from '@/api/schedule';

export default function ScheduleDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [schedule, setSchedule] = useState<WorkoutSchedule | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isParticipating, setIsParticipating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [scheduleData, commentsData] = await Promise.all([
          scheduleApi.getSchedule(params.id),
          scheduleApi.getComments(params.id)
        ]);
        setSchedule(scheduleData);
        setComments(commentsData);
      } catch (err) {
        setError('데이터를 불러오는데 실패했습니다.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleParticipate = async () => {
    if (!schedule) return;
    
    try {
      await scheduleApi.participateSchedule(schedule.id);
      setIsParticipating(true);
      // 참여자 수 업데이트
      setSchedule(prev => prev ? {
        ...prev,
        currentParticipants: prev.currentParticipants + 1
      } : null);
      alert('참여 신청이 완료되었습니다!');
    } catch (err) {
      alert('참여 신청에 실패했습니다. 다시 시도해주세요.');
      console.error('Error participating:', err);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !schedule) return;

    try {
      const comment = await scheduleApi.createComment(schedule.id, {
        content: newComment
      });
      setComments([...comments, comment]);
      setNewComment('');
    } catch (err) {
      alert('댓글 작성에 실패했습니다. 다시 시도해주세요.');
      console.error('Error creating comment:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xl text-gray-600">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error || !schedule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-500">{error || '일정을 찾을 수 없습니다.'}</p>
            <button
              onClick={() => router.push('/board/reservation')}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ScheduleInfo
          title={schedule.title}
          date={schedule.date}
          time={schedule.time}
          location={schedule.location}
          maxParticipants={schedule.maxParticipants}
          currentParticipants={schedule.currentParticipants}
          description={schedule.description}
          createdBy={schedule.createdBy}
          isParticipating={isParticipating}
          onParticipate={handleParticipate}
        />

        <CommentSection
          comments={comments}
          newComment={newComment}
          onCommentChange={setNewComment}
          onSubmit={handleCommentSubmit}
        />
      </div>
    </div>
  );
} 