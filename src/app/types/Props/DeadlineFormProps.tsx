import { DeadlineFormData } from "./DeadlineFormData";

export interface DeadlineFormProps {
    onSubmit: (data: DeadlineFormData) => void;
}