import { Schedule, ApiResponse } from '../types/schedule';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const getSchedules = async (): Promise<ApiResponse<Schedule[]>> => {
  const response = await fetch(`${API_URL}/v1/schedules`);
  if (!response.ok) {
    throw new Error('Failed to fetch schedules');
  }
  return response.json();
};

export interface CreateScheduleRequest {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  maxParticipants: number;
}

export const createSchedule = async (data: CreateScheduleRequest): Promise<ApiResponse<Schedule>> => {
  const response = await fetch(`${API_URL}/v1/schedules`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create schedule');
  }
  
  return response.json();
}; 