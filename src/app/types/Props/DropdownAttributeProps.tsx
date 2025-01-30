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

export const eyeColorItems: DropdownItem[] = [
    { value: 'BLUE', label: 'Blue' },
    { value: 'GREEN', label: 'Green' },
    { value: 'HAZEL', label: 'Hazel' },
    { value: 'BROWN', label: 'Brown' },
    { value: 'BLACK', label: 'Black' },
    { value: 'GRAY', label: 'Gray' },
    { value: 'AMBER', label: 'Amber' },
    { value: 'HETEROCHROMIA', label: 'Heterochromia' },
  ];
  
  export const hairColorItems: DropdownItem[] = [
    { value: 'BLACK', label: 'Black' },
    { value: 'BROWN', label: 'Brown' },
    { value: 'BLONDE', label: 'Blonde' },
    { value: 'RED', label: 'Red' },
    { value: 'AUBURN', label: 'Auburn' },
    { value: 'GRAY', label: 'Gray' },
    { value: 'WHITE', label: 'White' },
    { value: 'SILVER', label: 'Silver' },
    { value: 'SALT_AND_PEPPER', label: 'Salt and Pepper' },
  ];