import * as React from "react";
import { TextField, Box, Typography } from "@mui/material";

interface DateTimePickerProps {
  label: string;
  value: string; 
  onChange: (value: string) => void; 
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({ label, value, onChange }) => {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value); 
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Typography
        variant="body2"
        sx={{ marginBottom: 1, fontWeight: "medium", color: "#374151" }}
      >
        {label}
      </Typography>
      <TextField
        type="date"
        value={value} 
        onChange={handleDateChange} 
        variant="outlined"
        fullWidth
        sx={{ marginTop: 1 }}
      />
    </Box>
  );
};