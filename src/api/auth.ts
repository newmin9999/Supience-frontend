import { http } from './api';

export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  userId?: string;
  userName?: string;
}

export interface SignupResponse {
  success: boolean;
  message?: string;
}

export interface LogoutResponse {
  success: boolean;
  message?: string;
}

export const authApi = {
  // 로그인
  login: (data: LoginRequest) => http.post<LoginResponse>('/auth/login', data),

  // 회원가입
  signup: (data: SignupRequest) => http.post<SignupResponse>('/auth/signup', data),
  
  // 로그아웃
  logout: () => http.post<LogoutResponse>('/auth/logout', {}),
};
