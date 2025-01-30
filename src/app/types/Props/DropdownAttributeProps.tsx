export interface DropdownItem {
    value: string;
    label: string;
}
export interface DropdownAttributeProps {
    label: string;
    value: string;
    items: DropdownItem[];
    onChange: (e: any) => void;
}