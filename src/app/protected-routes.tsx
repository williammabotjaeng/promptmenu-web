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

  const [cookies] = useCookies(['user_type', 'access_token']);
  const accessToken = cookies?.access_token;
  const userType = cookies?.user_type;

  const { loginIsLoading, verifyOtpIsLoading } = useAuth();
  const { isAuthenticated } = useStore(useAuthStore);
  
  const accessRoute = userType === 'owner' ? '/dashboard/restaurant' : '/dashboard/diner';

  const isDynamicRouteMatch = (pathname: string, regexPatterns: RegExp[]): boolean => {
    return regexPatterns.some((regex) => regex.test(pathname));
  };

  const dynamicPrivateRoutes: RegExp[] = [
    /^\/event\/\d+$/,
    /^\/add-role\/\d+$/, 
    /^\/message\/\d+$/, 
    /^\/role\/\d+$/,
    /^\/talent\/\d+$/,
    /^\/apply\/\d+$/,
    /^\/applications\/\d+$/
  ];

  const dynamicPublicRoutes: RegExp[] = [
    /^\/reset\/[a-zA-Z0-9_-]+$/,
  ];

  const matchRoute = (pathname: string, routes: RegExp[]): boolean => {
    return routes.some((route) => route.test(pathname));
  };

  useEffect(() => {
    setRoutesResolved(false);
  
    if (accessToken && accessToken !== 'undefined') {
      if (publicRoutes.includes(pathname.toLowerCase()) || isDynamicRouteMatch(pathname.toLowerCase(), dynamicPublicRoutes)) {
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
      (!accessToken || accessToken === 'undefined') &&
      (publicRoutes.includes(pathname.toLowerCase()) || hybridRoutes.includes(pathname.toLowerCase()) || isDynamicRouteMatch(pathname.toLowerCase(), dynamicPublicRoutes))
    ) {
      console.log("On a public or hybrid route without token");
      setRoutesResolved(true);
      router.push(pathname);
    } else if (
      (!accessToken || accessToken === 'undefined') &&
      (privateRoutes.includes(pathname.toLowerCase()) || isDynamicRouteMatch(pathname.toLowerCase(), dynamicPrivateRoutes))
    ) {
      console.log("Attempting to access private route without token, redirecting to login");
      setRoutesResolved(true);
      router.push('/login');
    } else if (pathname === '/dashboard/') {
        if (userType === 'owner') {
          console.log("Redirecting to restaurant dashboard");
          setRoutesResolved(true);
          router.push('/dashboard/restaurant');
        } else {
          console.log("Redirecting to diner dashboard");
          setRoutesResolved(true);
          router.push('/dashboard/diner');
        }
    }
  
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
  
    return () => clearTimeout(timer);
  }, [accessToken, pathname, router]);

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