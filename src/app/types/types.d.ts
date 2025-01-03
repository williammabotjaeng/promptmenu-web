export interface RegistrationData {
    email: string;
    user_roles: string;
    date_of_birth: string; 
    password: string;
    username: string;
    firstname: string;
    lastname: string;
  }
  
  export interface LoginData {
    username: string;
    password: string;
  }
  
  export interface OTPData {
    username: string;
    otp: string; 
  }