// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        
        if (!credentials) return null;
        // 실제 사용자 인증 로직 (DB 조회 등)
        if (credentials?.username === 'admin' && credentials?.password === '1234') {
          return { id: 1, name: '관리자' };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/login', // 커스텀 로그인 페이지
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };
