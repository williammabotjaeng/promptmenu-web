import { create } from 'zustand';
import { TokenState } from '@/types/State/TokenState';

interface UserClaims {
    user_role: string;
    user_id: string;
}

interface ExtendedTokenState extends TokenState {
    userClaims: UserClaims | null;
    setUserClaims: (user_role: string, user_id: string) => void;
    clearUserClaims: () => void;
}

const useTokenStore = create<ExtendedTokenState>((set) => ({
    refreshToken: '',
    accessToken: '',
    userClaims: null,
    setTokens: (refreshToken: string, accessToken: string) => set({ refreshToken, accessToken }),
    clearTokens: () => set({ refreshToken: '', accessToken: '' }),
    setUserClaims: (user_role: string, user_id: string) => set({ userClaims: { user_role, user_id } }),
    clearUserClaims: () => set({ userClaims: null }),
}));

export default useTokenStore;