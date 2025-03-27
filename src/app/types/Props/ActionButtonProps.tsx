export interface ActionButtonProps {
    label: string;
    variant: 'primary' | 'secondary';
    onClick?: () => void;
}