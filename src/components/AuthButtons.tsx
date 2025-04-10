import { FiLogIn, FiUserPlus, FiUser } from 'react-icons/fi';
import Link from 'next/link';

interface AuthButtonsProps {
  isLoggedIn: boolean;
  className?: string;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isLoggedIn, className = '' }) => {
  return (
    <div className={`flex-1 flex justify-center space-x-8 ${className}`}>
      {isLoggedIn ? (
        <Link 
          href="/mypage"
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
        >
          <FiUser className="w-5 h-5" />
          <span className="hidden md:inline">마이페이지</span>
        </Link>
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