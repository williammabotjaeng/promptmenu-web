export interface UserState {
    username: string;
    email: string;
    setUser: (username: string, email: string) => void;
    clearUser: () => void;
}