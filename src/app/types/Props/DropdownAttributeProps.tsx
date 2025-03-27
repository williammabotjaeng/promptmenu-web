export interface DropdownItem {
    value: string;
    label: string;
}
export interface DropdownAttributeProps {
    label: string;
    value: string;
    items: DropdownItem[];
    onChange: (event: any) => void;
}

export const eyeColorItems: DropdownItem[] = [
    { value: 'Blue', label: 'Blue' },
    { value: 'Green', label: 'Green' },
    { value: 'Hazel', label: 'Hazel' },
    { value: 'Brown', label: 'Brown' },
    { value: 'Black', label: 'Black' },
    { value: 'Gray', label: 'Gray' },
    { value: 'Amber', label: 'Amber' },
    { value: 'Heterochromia', label: 'Heterochromia' },
  ];
  
  export const hairColorItems: DropdownItem[] = [
    { value: 'Black', label: 'Black' },
    { value: 'Brown', label: 'Brown' },
    { value: 'Blonde', label: 'Blonde' },
    { value: 'Red', label: 'Red' },
    { value: 'Auburn', label: 'Auburn' },
    { value: 'Gray', label: 'Gray' },
    { value: 'White', label: 'White' },
    { value: 'Silver', label: 'Silver' },
    { value: 'Salt and Pepper', label: 'Salt and Pepper' },
  ];