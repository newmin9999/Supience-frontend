export interface Schedule {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  maxParticipants: number;
  currentParticipants: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
} 

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

export interface CreateCommentRequest {
  content: string;
}