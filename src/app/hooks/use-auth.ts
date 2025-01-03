import { useMutation } from '@tanstack/react-query';
import api from './api'; // Import your Axios instance

// Define the types for the user data
interface User {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
}

const useAuth = () => {
  // User Registration Mutation
  const register = useMutation((userData: User) => {
    return api.post('/register', userData);
  });

  // User Login Mutation
  const login = useMutation((userData: Pick<User, 'email' | 'password'>) => {
    return api.post('/login', userData);
  });

  // User Logout Mutation
  const logout = useMutation(() => {
    return api.post('/logout');
  });

  // Forgot Password Mutation
  const forgotPassword = useMutation((email: string) => {
    return api.post('/forgot-password', { email });
  });

  return {
    register,
    login,
    logout,
    forgotPassword,
  };
};

export default useAuth;