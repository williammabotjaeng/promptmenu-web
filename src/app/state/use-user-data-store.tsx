import { create } from 'zustand';
import { UserDataState } from '@/types/State/UserDataState';

const useUserDataStore = create<UserDataState>((set) => ({
    user_role: null,
    profile_progress: null,
    onboarding_presented: null,
    profile_completed: null,
    setUserData: (user_role, profile_progress, onboarding_presented, profile_completed) => set({
        user_role,
        profile_progress,
        onboarding_presented,
        profile_completed,
    }),
    clearUserData: () => set({
        user_role: null,
        profile_progress: null,
        onboarding_presented: null,
        profile_completed: null,
    }),
}));

export default useUserDataStore;