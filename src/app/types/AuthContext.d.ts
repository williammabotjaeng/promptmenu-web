import { AuthenticatedUser } from '@/types/AuthenticatedUser';
import { LoginSuccessData } from '@/types/LoginSuccessData';
import { RegistrationSuccessData } from '@/types/RegistrationSuccessData';
import { ErrorData } from '@/types/ErrorData';
import { UserUpdateData } from '@/types/UserUpdateData';

export interface AuthContextType {
    user: boolean;
    login: (email: string, password: string) => Promise<void>;
    forgot: (email: string) => Promise<void>;
    reset: (email: string, password: string) => Promise<void>;
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
      user_role: string
    ) => Promise<void>;
    updateUser: (updateData: UserUpdateData) => Promise<void>;
    registerIsLoading: boolean;
    registerError: ErrorData | null; 
}