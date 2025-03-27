export interface TokenState {
    refreshToken: string;
    accessToken: string;
    setTokens: (refreshToken: string, accessToken: string) => void;
    clearTokens: () => void;
}