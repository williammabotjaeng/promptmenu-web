"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NextShield } from 'next-shield';
import { useCookies } from 'react-cookie';
import { useAuth } from '@/providers/auth-providers';

const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const router = useRouter();
  const [cookies] = useCookies(['access', 'user_role']);

  const { loginIsLoading, verifyOtpIsLoading } = useAuth();
  
  const accessToken = cookies?.access; 
  const user_role = cookies?.user_role;

  const accessRoute = user_role === 'client' ? '/dashboard' : '/portal';

  return (
    <NextShield
      isAuth={!!accessToken} 
      isLoading={loginIsLoading || verifyOtpIsLoading} 
      router={router}
      privateRoutes={['/dashboard', '/portal', '/client-onboarding', '/talent-onboarding']} 
      publicRoutes={['/', '/login', '/register', '/otp']}
      hybridRoutes={['/contact', 'talent']} 
      accessRoute={accessRoute} 
      loginRoute="/login"
      LoadingComponent={<p>Loading...</p>} 
    >
      {children}
    </NextShield>
  );
};

export default ProtectedRoutes;