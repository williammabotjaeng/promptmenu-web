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

  }, [session, status, router, currentPath]);

  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoutes;