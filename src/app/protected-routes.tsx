"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { NextShield } from 'next-shield';
import { useCookies } from 'react-cookie';
import { useAuth } from '@/providers/auth-providers';
import { useStore } from 'zustand';
import Loading from '@/components/Loading';
import useAuthStore from '@/state/use-auth-store';
import { publicRoutes, privateRoutes, hybridRoutes } from './routesConfig';

const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const router = useRouter();
  const pathname = usePathname();
  const [routesResolved, setRoutesResolved] = useState(true);
  const [loading, setLoading] = useState(false); 

  const [cookies] = useCookies(['user_role', 'access', 'ssh_session_id']);
  const sessionID = cookies?.ssh_session_id;

  const { loginIsLoading, verifyOtpIsLoading } = useAuth();
  const { isAuthenticated } = useStore(useAuthStore);
  
  const user_role = cookies?.user_role;
  const accessRoute = user_role === 'client' ? '/dashboard' : '/portal';

  useEffect(() => {
    setRoutesResolved(false);

    if (sessionID && sessionID !== 'undefined') {
      if (publicRoutes.includes(pathname.toLowerCase())) {
        console.log("Redirecting from public route to dashboard");
        setRoutesResolved(true);
        router.push('/dashboard');
      } else if (hybridRoutes.includes(pathname.toLowerCase())) {
        console.log("On a hybrid route");
        setRoutesResolved(true);
      } else if (privateRoutes.includes(pathname.toLowerCase())) {
        console.log("On a private route");
        setRoutesResolved(true);
      } else {
        console.log("Redirecting to dashboard from unknown route");
        setRoutesResolved(true);
        router.push('/dashboard');
      }
    } else if ((!sessionID || sessionID === 'undefined') && (publicRoutes.includes(pathname.toLocaleLowerCase()) || hybridRoutes.includes(pathname.toLocaleLowerCase()))) {
      console.log("Redirecting to login");
      setRoutesResolved(true);
      router.push(pathname);
    } else if ((!sessionID || sessionID === 'undefined') && privateRoutes.includes(pathname)) {
      setRoutesResolved(true);
      router.push('/login');
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); 

    return () => clearTimeout(timer); 
  }, [sessionID, pathname, router]);

  if (loading || !routesResolved || verifyOtpIsLoading) return <Loading />;

  return (
    <NextShield
      isAuth={isAuthenticated} 
      isLoading={loginIsLoading} 
      router={router}
      privateRoutes={privateRoutes} 
      publicRoutes={publicRoutes}
      hybridRoutes={hybridRoutes} 
      accessRoute={accessRoute} 
      loginRoute="/login"
      LoadingComponent={<Loading />} 
    >
      {children}
    </NextShield>
  );
};

export default ProtectedRoutes;