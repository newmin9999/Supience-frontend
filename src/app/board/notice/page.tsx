'use client';

import { useEffect, useState } from 'react';
import { Post, BoardResponse } from '@/types/board';
import { api } from '@/utils/api';

export default function NoticeBoard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response: BoardResponse = await api.getPosts('notice');
        setPosts(response.content);
      } catch (err) {
        setError('게시글을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">공지사항</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          글쓰기
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        {posts.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            등록된 게시글이 없습니다.
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="p-4 border-b hover:bg-gray-50">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                <span>{post.author}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 