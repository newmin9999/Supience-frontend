'use client';

import { useState } from 'react';
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaClock, FaUser, FaComment } from 'react-icons/fa';
import Logo from '@/components/Logo';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface WorkoutSchedule {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  description: string;
  createdBy: string;
}

// 임시 데이터
const mockSchedule: WorkoutSchedule = {
  id: '1',
  title: '조깅 모임',
  date: '2024-04-05',
  time: '07:00',
  location: '한강공원',
  maxParticipants: 10,
  currentParticipants: 3,
  description: '한강공원에서 함께 조깅하실 분을 모집합니다!',
  createdBy: '김철수'
};

const mockComments: Comment[] = [
  {
    id: '1',
    author: '이영희',
    content: '저도 참여하고 싶습니다!',
    createdAt: '2024-04-01 14:30'
  },
  {
    id: '2',
    author: '박지성',
    content: '초보자도 참여 가능한가요?',
    createdAt: '2024-04-01 15:00'
  }
];

export default function ScheduleDetailPage({ params }: { params: { id: string } }) {
  const [schedule] = useState<WorkoutSchedule>(mockSchedule);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [isParticipating, setIsParticipating] = useState(false);

  const handleParticipate = () => {
    if (schedule.currentParticipants < schedule.maxParticipants) {
      setIsParticipating(true);
      // TODO: 서버에 참여 요청 보내기
      alert('참여 신청이 완료되었습니다!');
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: '현재 사용자', // TODO: 실제 사용자 정보로 대체
      content: newComment,
      createdAt: new Date().toLocaleString()
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 일정 정보 */}
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
              onClick={handleParticipate}
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

        {/* 댓글 섹션 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FaComment className="mr-2" />
            댓글
          </h2>

          {/* 댓글 작성 폼 */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
              rows={3}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              댓글 작성
            </button>
          </form>

          {/* 댓글 목록 */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-gray-500" />
                    <span className="font-semibold">{comment.author}</span>
                  </div>
                  <span className="text-sm text-gray-500">{comment.createdAt}</span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 