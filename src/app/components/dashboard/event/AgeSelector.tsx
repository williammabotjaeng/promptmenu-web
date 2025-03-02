import * as React from "react";
import { Box, TextField, Typography } from "@mui/material";

type AgeSelectorProps = {
  label: string; 
  value: number | string; 
  onChange: (newValue: number | string) => void;
  error?: string; 
};

const AgeSelector: React.FC<AgeSelectorProps> = ({ label, value, onChange, error }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value === "" ? "" : parseInt(event.target.value, 10);
    onChange(newValue); 
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, width: "fit-content" }}>
      <Typography
        variant="body2"
        sx={{ paddingY: 1, color: "black", fontWeight: "bold" }}
      >
        {label}
      </Typography>
      <TextField
        type="number"
        value={value}
        onChange={handleChange}
        variant="outlined"
        error={!!error} 
        helperText={error}
        sx={{
          marginTop: 2,
          bgcolor: "white",
          borderRadius: "8px",
          height: "50px",
          "& .MuiOutlinedInput-root": {
            border: "1px solid",
            borderColor: error ? "red" : "grey.300", 
          },
        }}
        inputProps={{
          "aria-label": label,
        }}
      />
    </Box>
  );
};

export default AgeSelector;