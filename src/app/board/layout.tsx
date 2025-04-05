import Link from 'next/link'
import Logo from '@/components/Logo'
import { FaBullhorn, FaComments, FaQuestionCircle, FaCalendarAlt } from 'react-icons/fa';

const boards = [
  {
    href: '/board/notice',
    icon: FaBullhorn,
    title: '공지사항',
  },
  {
    href: '/board/free',
    icon: FaComments,
    title: '자유게시판',
  },
  {
    href: '/board/qna',
    icon: FaQuestionCircle,
    title: 'Q&A',
  },
  {
    href: '/board/reservation',
    icon: FaCalendarAlt,
    title: '운동 예약',
  },
];

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
          <div className="flex items-center h-20">
            <div className="w-48">
              <Logo size="xl" />
            </div>
            <nav className="flex-1 flex justify-center space-x-8">
              {boards.map((board) => (
                <Link
                  key={board.href}
                  href={board.href}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  title={board.title}
                >
                  <board.icon className="w-5 h-5" />
                  <span className="hidden md:inline">{board.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          {children}
        </div>
      </div>
    </div>
  )
} 