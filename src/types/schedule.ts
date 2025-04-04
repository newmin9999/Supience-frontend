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