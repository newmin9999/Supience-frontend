import { Schedule, ApiResponse } from '../types/schedule';
import { apiFetch } from './fetch';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:8443';

export interface CreateScheduleRequest {
  title: string;
  description: string;
  startTime: string;
  endTime?: string;
  maxParticipants: number;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface WorkoutSchedule {
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

export interface CreateCommentRequest {
  content: string;
}

export const scheduleApi = {
  // 스케줄 목록 조회
  async getSchedules(): Promise<ApiResponse<Schedule[]>> {
    return apiFetch('/api/v1/schedules');
  },

  // 스케줄 생성
  async createSchedule(data: CreateScheduleRequest): Promise<ApiResponse<Schedule>> {
    return apiFetch('/api/v1/schedules', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // 일정 상세 조회
  getSchedule: async (id: string): Promise<WorkoutSchedule> => {
    return apiFetch(`/api/v1/schedules/${id}`);
  },

  // 댓글 목록 조회
  getComments: async (scheduleId: string): Promise<Comment[]> => {
    return apiFetch(`/api/v1/schedules/${scheduleId}/comments`);
  },

  // 댓글 작성
  createComment: async (scheduleId: string, data: CreateCommentRequest): Promise<Comment> => {
    return apiFetch(`/api/v1/schedules/${scheduleId}/comments`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // 일정 참여
  participateSchedule: async (scheduleId: string): Promise<void> => {
    return apiFetch(`/api/v1/schedules/${scheduleId}/participate`, {
      method: 'POST',
    });
  },
}; 