import { useMutation } from '@tanstack/react-query';
import api from '@/hooks/utility/api'; 
import { RegistrationData, LoginData, OTPData } from '@/types/types'; 

const useAuth = () => {
  // User Registration Mutation
  const register = useMutation((userData: RegistrationData) => {
    return api.post('/register', userData);
  });

  // User Login Mutation
  const login = useMutation((userData: LoginData) => {
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

  // Verify OTP Mutation
  const verifyOTP = useMutation((otpData: OTPData) => {
    return api.post('/verify-otp', otpData);
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