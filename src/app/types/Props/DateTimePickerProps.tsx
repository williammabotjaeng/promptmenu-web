export interface DateTimePickerProps {
    label: string;
    value: string;
    onChange?: (value: string) => void;
    renderInput?: (params: any) => Element;
}