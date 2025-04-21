import { http } from './api';
import { Post, BoardResponse, CreatePostRequest, UpdatePostRequest } from '../types/board';

export const boardApi = {
  // 게시글 목록 조회
  async getPosts(boardType: string, page: number = 0, size: number = 10): Promise<BoardResponse> {
    return http.get<BoardResponse>(`/boards/${boardType}/posts?page=${page}&size=${size}`);
  },

  // 게시글 상세 조회
  async getPost(boardType: string, postId: number): Promise<Post> {
    return http.get<Post>(`/boards/${boardType}/posts/${postId}`);
  },

  // 게시글 작성
  async createPost(boardType: string, data: CreatePostRequest): Promise<Post> {
    return http.post<Post>(`/boards/${boardType}/posts`, data);
  },

  // 게시글 수정
  async updatePost(boardType: string, postId: number, data: UpdatePostRequest): Promise<Post> {
    return http.put<Post>(`/boards/${boardType}/posts/${postId}`, data);
  },

  // 게시글 삭제
  async deletePost(boardType: string, postId: number): Promise<void> {
    return http.delete<void>(`/boards/${boardType}/posts/${postId}`);
  },
}; 