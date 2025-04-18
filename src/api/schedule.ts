import { http } from './api';
import { Schedule, ApiResponse, CreateScheduleRequest, Comment, CreateCommentRequest } from '../types/schedule';

export const scheduleApi = {
  // 스케줄 목록 조회
  async getSchedules(): Promise<ApiResponse<Schedule[]>> {
    return http.get<ApiResponse<Schedule[]>>('/api/v1/schedules');
  },

  // 스케줄 생성
  async createSchedule(data: CreateScheduleRequest): Promise<ApiResponse<Schedule>> {
    return http.post<ApiResponse<Schedule>>('/api/v1/schedules', data);
  },

  // 일정 상세 조회
  async getSchedule(id: string): Promise<Schedule> {
    return http.get<Schedule>(`/api/v1/schedules/${id}`);
  },

  // 댓글 목록 조회
  async getComments(scheduleId: string): Promise<Comment[]> {
    return http.get<Comment[]>(`/api/v1/schedules/${scheduleId}/comments`);
  },

  // 댓글 작성
  async createComment(scheduleId: string, data: CreateCommentRequest): Promise<Comment> {
    return http.post<Comment>(`/api/v1/schedules/${scheduleId}/comments`, data);
  },

  // 일정 참여
  async participateSchedule(scheduleId: string): Promise<void> {
    return http.post<void>(`/api/v1/schedules/${scheduleId}/participate`, {});
  },
}; 