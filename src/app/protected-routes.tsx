// components/protectedRoutes.tsx
import { useRouter } from 'next/navigation';
import { NextShield } from 'next-shield';
import { useAuth } from '@/providers/auth-providers';

const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { user } = useAuth(); 

  return (
    <NextShield
      isAuth={!!user} 
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