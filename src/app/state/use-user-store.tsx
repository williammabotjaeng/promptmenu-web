import { create } from 'zustand';
import { UserState } from '@/types/State/UserState';

const useUserStore = create((set: (arg0: { username: string; email: string; setCurrentUser: (username: string, email: string) => void; clearCurrentUser: () => void; }) => any) => ({
    username: '',
    email: '',
    setCurrentUser: (username: string, email: string) => set({
        username, email,
        setCurrentUser: function (): void {
            throw new Error('Function not implemented.');
        },
        clearCurrentUser: function (): void {
            throw new Error('Function not implemented.');
        }
    }),
    clearCurrentUser: () => set({
        username: '', email: '',
        setCurrentUser: function (username: string, email: string): void {
            throw new Error('Function not implemented.');
        },
        clearCurrentUser: function (): void {
            throw new Error('Function not implemented.');
        }
    }),
}));

export default useUserStore;