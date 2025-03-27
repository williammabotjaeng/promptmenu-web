import { create } from 'zustand';
import { UserState } from '@/types/State/UserState';

const useUserStore = create<UserState>((set: (arg0: { username: string; email: string; }) => any) => ({
    username: '',
    email: '',
    setCurrentUser: (username: string, email: string) => set({
        username, email
    }),
    clearCurrentUser: () => set({
        username: '', email: ''
    }),
}));

export default useUserStore;