'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '@/api/auth';
import axios from 'axios';

interface AuthContextType {
  loading: boolean;
  isAuthenticated: boolean;
  login: (loginId: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  loading: false,
  isAuthenticated: false,
  login: async () => false,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 세션 쿠키 확인 함수
  const checkSessionCookie = (): boolean => {
    try {
      // 세션 쿠키 확인 (여러 가능한 이름 시도)
      const sessionCookieNames = ['JSESSIONID'];
      return sessionCookieNames.some(name => 
        document.cookie.includes(`${name}=`)
      );
    } catch (error) {
      console.error('세션 쿠키 확인 실패:', error);
      return false;
    }
  };

  // 초기 로드 시 세션 쿠키 확인
  useEffect(() => {
    const checkSession = () => {
      try {
        const hasSessionCookie = checkSessionCookie();
        setIsAuthenticated(hasSessionCookie);
      } catch (error) {
        console.error('세션 쿠키 확인 실패:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // 401 에러 인터셉터 설정
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // 401 에러 발생 시 로그아웃 처리
          handleLogout();
        }
        return Promise.reject(error);
      }
    );

    // 컴포넌트 언마운트 시 인터셉터 제거
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = async (loginId: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await authApi.login({ loginId, password });
      
      if (response.success) {
        // 로그인 성공 시 세션 쿠키가 자동으로 설정됨
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('로그인 실패:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청
      await authApi.logout();
    } catch (error) {
      console.error('로그아웃 요청 실패:', error);
    } finally {
      // 클라이언트 상태 업데이트
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    await handleLogout();
  };

  return (
    <AuthContext.Provider value={{ 
      loading, 
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 