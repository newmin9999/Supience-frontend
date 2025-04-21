export interface Schedule {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  description: string;
  createdBy: string;
  participants: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface CreateScheduleRequest {
  title: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  description: string;
}

export interface Comment {
  id: string;
  content: string;
  createdBy: string;
  createdAt: string;
}

export interface CreateCommentRequest {
  content: string;
}