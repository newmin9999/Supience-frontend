'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ScheduleInfo from '@/components/ScheduleInfo';
import CommentSection from '@/components/CommentSection';
import { useSchedule } from '@/hooks/useSchedule';

export default function ScheduleDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [newComment, setNewComment] = useState('');
  const {
    schedule,
    comments,
    isParticipating,
    loading,
    error,
    handleParticipate,
    handleCommentSubmit
  } = useSchedule(params.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleCommentSubmit(newComment);
    if (success) {
      setNewComment('');
    }
  };

  if (loading) {
    return <LoadingView />;
  }

  if (error || !schedule) {
    return <ErrorView error={error} onBack={() => router.push('/board/reservation')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ScheduleInfo
          schedule={schedule}
          isParticipating={isParticipating}
          onParticipate={handleParticipate}
        />

        <CommentSection
          comments={comments}
          newComment={newComment}
          onCommentChange={setNewComment}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

function LoadingView() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    </div>
  );
}

function ErrorView({ error, onBack }: { error: string | null; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-500">{error || '일정을 찾을 수 없습니다.'}</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
} 