"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useCookies } from 'react-cookie';

const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession(); 
  const currentPath = usePathname(); 
  const [cookies] = useCookies(['user_role']);

  useEffect(() => {
    // Check if the session is loading
    if (status === 'loading') return;

    // If not authenticated, redirect to login
    if (!session) {
      router.push('/login');
      return;
    }

    // Redirect based on user role
    const userRole = cookies['user_role']; 

    console.log("Current Path: ", currentPath);
    console.log("User Role: ", userRole);

    if (userRole === 'client' && (currentPath === '/login' || currentPath === '/portal' || currentPath === '/register' || currentPath === '/otp' || currentPath === '/')) {
      router.push('/dashboard');
    }

    if (userRole === 'talent' && (currentPath === '/login' || currentPath === '/dashboard' || currentPath === '/register' || currentPath === '/otp' || currentPath === '/')) {
      router.push('/portal');
    }

  }, [session, status, router, currentPath]);

  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoutes;