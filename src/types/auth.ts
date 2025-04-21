export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  data?: {
    id: string;
    name: string;
  };
  message?: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
    user: {
      id: string;
      name: string;
    };
  };
  message?: string;
}

export interface User {
  id: string;
  name: string;
} 