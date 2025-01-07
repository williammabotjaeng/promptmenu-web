"use client";

import { useRouter } from 'next/navigation';
import { NextShield } from 'next-shield';
import useTokenStore from '@/state/use-token-store';
import { usePathname } from 'next/navigation'
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const pathname = usePathname();

  const [cookies] = useCookies(['access']);

  const accessToken = cookies.access; 


  useEffect(() => {
    if (accessToken && (pathname === '/login' || pathname === '/register' || pathname === '/')) {
      router.push('/dashboard'); 
    }
  }, [cookies, router]);

  return (
    <NextShield
      isAuth={!!accessToken} 
      isLoading={false} 
      router={router}
      privateRoutes={['/dashboard']} 
      publicRoutes={['/', '/login', '/register', '/otp']}
      hybridRoutes={['/contact']} 
      accessRoute="/dashboard" 
      loginRoute="/login"
      LoadingComponent={<p>Loading...</p>} 
    >
      {children}
    </NextShield>
  );
};

export default ProtectedRoutes;