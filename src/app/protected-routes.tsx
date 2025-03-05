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
import { access } from 'fs';

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

  const isDynamicRouteMatch = (pathname: string, regexPatterns: RegExp[]): boolean => {
    return regexPatterns.some((regex) => regex.test(pathname));
  };

  const dynamicPrivateRoutes: RegExp[] = [
    /^\/event\/\d+$/,
    /^\/add-role\/\d+$/, 
    /^\/message\/\d+$/, 
  ];

  const matchRoute = (pathname: string, routes: RegExp[]): boolean => {
    return routes.some((route) => route.test(pathname));
  };

  useEffect(() => {
    setRoutesResolved(false);
  
    if (sessionID && sessionID !== 'undefined') {
      if (publicRoutes.includes(pathname.toLowerCase())) {
        console.log("Redirecting from public route to dashboard");
        setRoutesResolved(true);
        router.push(accessRoute);
      } else if (hybridRoutes.includes(pathname.toLowerCase())) {
        console.log("On a hybrid route");
        setRoutesResolved(true);
        router.push(pathname);
      } else if (
        privateRoutes.includes(pathname.toLowerCase()) || // Check static private routes
        isDynamicRouteMatch(pathname.toLowerCase(), dynamicPrivateRoutes) // Check dynamic private routes
      ) {
        console.log("On a private route");
        setRoutesResolved(true);
        router.push(pathname);
      } else {
        console.log("Redirecting to dashboard from unknown route");
        setRoutesResolved(true);
        router.push(accessRoute);
      }
    } else if (
      (!sessionID || sessionID === 'undefined') &&
      (publicRoutes.includes(pathname.toLowerCase()) || hybridRoutes.includes(pathname.toLowerCase()))
    ) {
      console.log("Redirecting to login");
      setRoutesResolved(true);
      router.push(pathname);
    } else if (
      (!sessionID || sessionID === 'undefined') &&
      (privateRoutes.includes(pathname.toLowerCase()) || isDynamicRouteMatch(pathname.toLowerCase(), dynamicPrivateRoutes))
    ) {
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