import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { useAuth } from '@/providers/auth-providers';
import config from 'config';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Enter your username' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter your password' },
      },
      async authorize(credentials) {
        try {
          const { login } = useAuth();
          const user: any = await login(credentials.username, credentials.password);

          return user || null; 
        } catch (error) {
          console.error('Login error: ', error);
          return null; 
        }
      },
    }),
  ],
  pages: {
    signIn: '/login', 
    newUser: '/register'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("user data", user);
        token.access = user.access;
        token.refresh = user.refresh;
        token.user_role = user.user_role;
        token.profile_progress = user.profile_progress;
        token.onboarding_presented = user.onboarding_presented;
        token.profile_completed = user.profile_completed;
      }
      return token;
    },
    async session({ session, token }) {
      session.access = token.access;
      session.refresh = token.refresh;
      session.user_role = token.user_role;
      session.profile_progress = token.profile_progress;
      session.onboarding_presented = token.onboarding_presented;
      session.profile_completed = token.profile_completed;
      return session;
    },
  },
  secret: config.nextAuthSecret, 
});

export { handler as GET, handler as POST };