"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { NextShield } from 'next-shield';
import { useCookies } from 'react-cookie';
import { useAuth } from '@/providers/auth-providers';
import { useStore } from 'zustand';
import Loading from '@/components/Loading';
import useAuthStore from './state/use-auth-store';

const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const router = useRouter();
  const pathname = usePathname();

  const [cookies] = useCookies(['user_role', 'access']);

  const accessToken = cookies?.access;

  const { loginIsLoading, verifyOtpIsLoading, user } = useAuth();

  const { isAuthenticated } = useStore(useAuthStore);
  
  const user_role = cookies?.user_role;

  const accessRoute = user_role === 'client' ? '/dashboard' : '/portal';

  useEffect(() => {
    console.log("Pathname:", pathname);
    console.log("Cookies Status:", accessToken)
    if (accessToken && pathname.toLocaleLowerCase() === '/login')
    {
      console.log("I'm on login");
      router.push('/dashboard');
    } else if (accessToken && pathname.toLocaleLowerCase() === '/register') {
      console.log("I'm on register");
      router.push('/dashboard');
    } else if (accessToken && pathname.toLocaleLowerCase() === '/') {
      console.log("I'm on home");
      router.push('/dashboard');
    }
    
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