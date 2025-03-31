import { create } from 'zustand';

export interface AuthState {
    isAuthenticated: boolean; 
    setAuth: (auth: boolean) => void; 
    clearAuth: () => void; 
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false, 
    setAuth: (auth: boolean) => set({ isAuthenticated: auth }), 
    clearAuth: () => set({ isAuthenticated: false }),
}));

export default useAuthStore;