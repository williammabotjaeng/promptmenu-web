export interface UserState {
    username: string;
    email: string;
    setCurrentUser: (username: string, email: string) => void;
    clearCurrentUser: () => void;
}