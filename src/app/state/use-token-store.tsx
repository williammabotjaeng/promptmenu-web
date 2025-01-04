import { create } from 'zustand';
import { TokenState } from '@/types/State/TokenState';

const useTokenStore = create<TokenState>((set: (arg0: { refreshToken: string; accessToken: string; }) => any) => ({
    refreshToken: '',
    accessToken: '',
    setTokens: (refreshToken: string, accessToken: string) => set({ refreshToken, accessToken }),
    clearTokens: () => set({ refreshToken: '', accessToken: ''}),
}));

export default useTokenStore;