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

  const [cookies] = useCookies(['access', 'user_role']);

  const accessToken = cookies?.access; 
  const user_role = cookies?.user_role;

  console.log("Access Token", accessToken);
  console.log("User Role", user_role);

  useEffect(() => {
    if ((accessToken && user_role === 'client') && (pathname === '/login' || pathname === '/portal' || pathname === '/register' || pathname === '/otp' || pathname === '/')) {
      router.push('/dashboard'); 
    }

    if ((accessToken && user_role === 'talent') && (pathname === '/login' || pathname === '/dashboard' || pathname === '/register' || pathname === '/otp' || pathname === '/')) {
      router.push('/portal'); 
    }

  }, [pathname, accessToken, router, user_role]);

  return (
    <NextShield
      isAuth={!!accessToken} 
      isLoading={false} 
      router={router}
      privateRoutes={['/dashboard', '/portal']} 
      publicRoutes={['/', '/login', '/register', '/otp']}
      hybridRoutes={['/contact']} 
      accessRoute={user_role === 'client' ? '/dashboard' : '/portal'} 
      loginRoute="/login"
      LoadingComponent={<p>Loading...</p>} 
    >
      {children}
    </NextShield>
  );
};

export default ProtectedRoutes;