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

  const [cookies] = useCookies(['accessToken']);

  const accessToken = cookies.accessToken; 

  useEffect(() => {
    if (accessToken && (pathname === '/login' || pathname === '/register' || pathname === '/')) {
      router.push('/dashboard'); 
    }
  }, [accessToken, router]);

  return (
    <NextShield
      isAuth={!!accessToken} 
      isLoading={false} 
      router={router}
      privateRoutes={['/dashboard', '/contact']} 
      publicRoutes={['/', '/login', '/register', '/otp', '/contact']} 
      accessRoute="/dashboard" 
      loginRoute="/login"
      LoadingComponent={<p>Loading...</p>} 
    >
      {children}
    </NextShield>
  );
};

export default ProtectedRoutes;