export interface UserDataState {
    user_role: string | null;
    profile_progress: number | null;
    onboarding_presented: boolean | null;
    profile_completed: boolean | null;
    setUserData: (user_role: string | null, profile_progress: number | null, onboarding_presented: boolean | null, profile_completed: boolean | null) => void;
    clearUserData: () => void;
}
