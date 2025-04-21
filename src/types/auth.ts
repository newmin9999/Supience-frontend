export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
} 