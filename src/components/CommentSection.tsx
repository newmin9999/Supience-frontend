import { useState } from 'react';
import { Comment } from '@/types/schedule';
import { FaComment, FaUser } from 'react-icons/fa';

interface CommentSectionProps {
  comments: Comment[];
  newComment: string;
  onCommentChange: (comment: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function CommentSection({
  comments,
  newComment,
  onCommentChange,
  onSubmit
}: CommentSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <FaComment className="mr-2" />
        댓글
      </h2>

      {/* 댓글 작성 폼 */}
      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{comment.createdBy}</span>
              <span className="text-sm text-gray-500">{comment.createdAt}</span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex gap-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder="댓글을 입력하세요..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          등록
        </button>
      </form>
    </div>
  );
} 