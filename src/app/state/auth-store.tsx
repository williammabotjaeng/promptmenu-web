import { create } from 'zustand';
import Cookies from 'react-cookies';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const cookies = new Cookies();

const useAuthStore = create<AuthState>((set) => ({
  accessToken: cookies.get('accessToken') || null,
  refreshToken: cookies.get('refreshToken') || null,
  isAuthenticated: !!cookies.get('accessToken'),
  login: (accessToken, refreshToken) => {
    cookies.set('accessToken', accessToken, { path: '/' });
    cookies.set('refreshToken', refreshToken, { path: '/' });
    set({ accessToken, refreshToken, isAuthenticated: true });
  },
  logout: () => {
    cookies.remove('accessToken', { path: '/' });
    cookies.remove('refreshToken', { path: '/' });
    set({ accessToken: null, refreshToken: null, isAuthenticated: false });
  },
}));

export default useAuthStore;