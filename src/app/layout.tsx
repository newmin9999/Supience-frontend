import React from 'react';
import './globals.css'
import Providers from '@/components/Providers';

export const metadata = {
  title: '대한 패들 연맹',
  description: '대한 패들 연맹 홈페이지',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
