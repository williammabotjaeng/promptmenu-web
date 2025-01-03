import { useMutation } from '@tanstack/react-query';
import api from '@/hooks/utility/api'; 
import { RegistrationData, LoginData, OTPData } from '@/types/types'; 

const useAuth = () => {

  // User Registration Mutation
  const register = useMutation({
    mutationFn: (userData: RegistrationData) => api.post('/register', userData),
    mutationKey: ['register'],
    onSuccess: (data) => {
      console.log('Registration successful:', data);
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

  // User Login Mutation
  const login = useMutation({
    mutationFn: (userData: LoginData) => api.post('/login', userData),
    mutationKey: ['login'],
    onSuccess: (data) => {
      console.log('Login successful:', data);
      // Optionally store user data or tokens
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  // User Logout Mutation
  const logout = useMutation({
    mutationFn: () => api.post('/logout'),
    mutationKey: ['logout'],
    onSuccess: () => {
      console.log('Logout successful');
      // Optionally clear user data or tokens
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });

  // Forgot Password Mutation
  const forgotPassword = useMutation({
    mutationFn: (email: string) => api.post('/forgot-password', { email }),
    mutationKey: ['forgot-password'],
    onSuccess: () => {
      console.log('Forgot password request sent');
    },
    onError: (error) => {
      console.error('Forgot password request failed:', error);
    },
  });

  // Verify OTP Mutation
  const verifyOTP = useMutation({
    mutationFn: (otpData: OTPData) => api.post('/verify-otp', otpData),
    mutationKey: ['verify-otp'],
    onSuccess: (data) => {
      console.log('OTP verification successful:', data);
      // Optionally navigate to another page or update state
    },
    onError: (error) => {
      console.error('OTP verification failed:', error);
    },
  });

  return {
    register,
    login,
    logout,
    forgotPassword,
    verifyOTP,
  };
};

export default useAuth;