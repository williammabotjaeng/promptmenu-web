export interface RegistrationData {
  email: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  user_role: "talent" | "client" | "influencer";
}
