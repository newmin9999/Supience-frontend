'use client';

import { useAuth } from '@/contexts/AuthContext';
import { FiLogIn, FiUserPlus, FiUser, FiLogOut } from 'react-icons/fi';
import Link from 'next/link';

interface AuthButtonsProps {
  className?: string;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ className = '' }) => {
  const { loading, isAuthenticated, logout } = useAuth();
  
  if (loading) {
    return (
      <div className={`flex-1 flex justify-center space-x-8 ${className}`}>
        <div className="animate-pulse flex items-center gap-2 px-4 py-2 text-gray-400">
          <FiUser className="w-5 h-5" />
          <span className="hidden md:inline">로딩중...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`flex-1 flex justify-center space-x-8 ${className}`}>
      {isAuthenticated ? (
        <>
          <Link 
            href="/mypage"
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            <FiUser className="w-5 h-5" />
            <span className="hidden md:inline">마이페이지</span>
          </Link>
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <FiLogOut className="w-5 h-5" />
            <span className="hidden md:inline">로그아웃</span>
          </button>
        </>
      ) : (
        <>
          <Link 
            href="/auth/login" 
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            <FiLogIn className="w-5 h-5" />
            <span className="hidden md:inline">로그인</span>
          </Link>
          <Link 
            href="/auth/signup" 
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            <FiUserPlus className="w-5 h-5" />
            <span className="hidden md:inline">회원가입</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthButtons; 