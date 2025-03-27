export interface OnboardingHeaderProps {
    steps: { number: number; title: string; isActive: boolean }[];
    onClose: () => void;
}