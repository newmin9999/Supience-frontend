import { http } from './api';
import { LoginRequest, LoginResponse } from '../types/auth';

export const authApi = {
  // 로그인
  async login(data: LoginRequest): Promise<LoginResponse> {
    return http.post<LoginResponse>('/auth/login', data);
  },

  // 회원가입
  async signup(loginId: string, password: string, name: string) {
    return http.post('/auth/signup', { loginId, password, name });
  },
};
