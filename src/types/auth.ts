export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface SignupRequest {
  loginId: string;  // 영문과 숫자로 4~20자리
  password: string; // 영문, 숫자, 특수문자를 포함한 8~20자리
  name: string;     // 한글로 2~10자리
  email: string;    // 이메일 형식
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