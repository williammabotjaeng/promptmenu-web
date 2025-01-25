"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NextShield } from 'next-shield';
import { useCookies } from 'react-cookie';
import { useAuth } from '@/providers/auth-providers';
import { useStore } from 'zustand';
import Loading from '@/components/Loading';
import useAuthStore from './state/use-auth-store';

const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const router = useRouter();
  const [cookies] = useCookies(['user_role']);

  const { loginIsLoading, verifyOtpIsLoading, user } = useAuth();

  const { isAuthenticated } = useStore(useAuthStore);
  
  const user_role = cookies?.user_role;

  const accessRoute = user_role === 'client' ? '/dashboard' : '/portal';

  useEffect(() => {
    console.log("Value of User:", useAuthStore.getState().isAuthenticated);
  }, []);

  return (
    <NextShield
      isAuth={useAuthStore.getState().isAuthenticated} 
      isLoading={loginIsLoading || verifyOtpIsLoading} 
      router={router}
      privateRoutes={['/dashboard', '/portal', '/client-onboarding', '/talent-onboarding']} 
      publicRoutes={['/', '/login', '/register', '/otp']}
      hybridRoutes={['/contact', 'talent']} 
      accessRoute="/dashboard" 
      loginRoute="/login"
      LoadingComponent={<Loading />} 
    >
      {children}
    </NextShield>
  );
};

export default ProtectedRoutes;