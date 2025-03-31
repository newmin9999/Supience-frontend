import { CreatePostRequest, UpdatePostRequest } from '@/types/board';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const api = {
  // 게시글 목록 조회
  async getPosts(boardType: string, page: number = 0, size: number = 10) {
    const response = await fetch(
      `${API_BASE_URL}/boards/${boardType}/posts?page=${page}&size=${size}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('게시글 목록을 불러오는데 실패했습니다.');
    }
    
    return response.json();
  },

  // 게시글 상세 조회
  async getPost(boardType: string, postId: number) {
    const response = await fetch(
      `${API_BASE_URL}/boards/${boardType}/posts/${postId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('게시글을 불러오는데 실패했습니다.');
    }
    
    return response.json();
  },

  // 게시글 작성
  async createPost(boardType: string, data: CreatePostRequest) {
    const response = await fetch(
      `${API_BASE_URL}/boards/${boardType}/posts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    
    if (!response.ok) {
      throw new Error('게시글 작성에 실패했습니다.');
    }
    
    return response.json();
  },

  // 게시글 수정
  async updatePost(boardType: string, postId: number, data: UpdatePostRequest) {
    const response = await fetch(
      `${API_BASE_URL}/boards/${boardType}/posts/${postId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    
    if (!response.ok) {
      throw new Error('게시글 수정에 실패했습니다.');
    }
    
    return response.json();
  },

  // 게시글 삭제
  async deletePost(boardType: string, postId: number) {
    const response = await fetch(
      `${API_BASE_URL}/boards/${boardType}/posts/${postId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('게시글 삭제에 실패했습니다.');
    }
    
    return response.json();
  },
}; 