import Link from 'next/link'

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← 메인으로 돌아가기
        </Link>
        {children}
      </div>
    </div>
  )
} 