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

  console.log("Access Token", accessToken);

  useEffect(() => {
    if (accessToken && (pathname === '/login' || pathname === '/portal' || pathname === '/register' || pathname === '/otp' || pathname === '/')) {
      router.push('/dashboard'); 
    }

    if (accessToken && (pathname === '/login' || pathname === '/dashboard' || pathname === '/register' || pathname === '/otp' || pathname === '/')) {
      router.push('/portal'); 
    }

  }, [pathname, accessToken, router]);

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