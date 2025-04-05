import { Schedule, ApiResponse } from '../types/schedule';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

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
    const response = await fetch(`${API_URL}/v1/schedules`);
    if (!response.ok) {
      throw new Error('스케줄 목록을 불러오는데 실패했습니다.');
    }
    return response.json();
  },

  // 스케줄 생성
  async createSchedule(data: CreateScheduleRequest): Promise<ApiResponse<Schedule>> {
    const response = await fetch(`${API_URL}/v1/schedules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('스케줄 생성에 실패했습니다.');
    }
    
    return response.json();
  },

  // 일정 상세 조회
  getSchedule: async (id: string): Promise<WorkoutSchedule> => {
    const response = await fetch(`${API_URL}/schedules/${id}`);
    if (!response.ok) {
      throw new Error('일정 조회에 실패했습니다.');
    }
    return response.json();
  },

  // 댓글 목록 조회
  getComments: async (scheduleId: string): Promise<Comment[]> => {
    const response = await fetch(`${API_URL}/schedules/${scheduleId}/comments`);
    if (!response.ok) {
      throw new Error('댓글 조회에 실패했습니다.');
    }
    return response.json();
  },

  // 댓글 작성
  createComment: async (scheduleId: string, data: CreateCommentRequest): Promise<Comment> => {
    const response = await fetch(`${API_URL}/schedules/${scheduleId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('댓글 작성에 실패했습니다.');
    }
    return response.json();
  },

  // 일정 참여
  participateSchedule: async (scheduleId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/schedules/${scheduleId}/participate`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('참여 신청에 실패했습니다.');
    }
  },
}; 