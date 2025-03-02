import { TextField } from "@mui/material";

export const PaymentInput: React.FC<{
  label: string;
  id: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}> = ({ label, id, value, onChange, error }) => (
  <TextField
    label={label}
    id={id}
    value={value}
    onChange={onChange}
    error={!!error}
    helperText={error}
    type="number"
    variant="outlined"
    sx={{ flex: 1 }}
  />
);