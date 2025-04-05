import { FaComment, FaUser } from 'react-icons/fa';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface CommentSectionProps {
  comments: Comment[];
  newComment: string;
  onCommentChange: (value: string) => void;
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
      <form onSubmit={onSubmit} className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => onCommentChange(e.target.value)}
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
  );
} 