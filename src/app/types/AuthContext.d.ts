import { AuthenticatedUser } from '@/types/AuthenticatedUser';
import { LoginSuccessData } from '@/types/LoginSuccessData';
import { RegistrationSuccessData } from '@/types/RegistrationSuccessData';
import { ErrorData } from '@/types/ErrorData';

export interface AuthContextType {
    user: AuthenticatedUser | RegistrationSuccessData | null;
    login: (email: string, password: string) => Promise<void>;
    loginIsLoading: boolean; 
    loginError: boolean; 
    verifyOtp: (username: string, otp: string) => Promise<void>;
    verifyOtpIsLoading: boolean; 
    verifyOtpError: boolean; 
    logout: () => void;
    register: (
      username: string,
      password: string,
      email: string,
      firstname: string,
      lastname: string,
    ) => Promise<void>;
    registerIsLoading: boolean;
    registerError: ErrorData | null; 
}