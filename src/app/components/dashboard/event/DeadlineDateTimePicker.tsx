import * as React from "react";
import { TextField, Box, Typography, FormHelperText, InputAdornment } from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface DateTimePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
  minDateTime?: Date;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  value,
  onChange,
  error = false,
  helperText = "",
  minDateTime
}) => {
  // Format minDateTime to the format expected by the datetime-local input
  const minDateTimeString = minDateTime 
    ? new Date(minDateTime.getTime() - minDateTime.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16)
    : "";

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      flex: 1,
      position: "relative",
      "&:after": error ? {
        content: '""',
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        pointerEvents: "none",
        boxShadow: "0 0 0 3px rgba(211, 47, 47, 0.1)",
        borderRadius: "10px",
        opacity: 0.7
      } : {}
    }}>
      <Typography
        variant="body2"
        sx={{ 
          marginBottom: 1, 
          fontWeight: "medium", 
          color: error ? "error.main" : "#374151",
          display: "flex",
          alignItems: "center"
        }}
      >
        <EventIcon 
          sx={{ 
            mr: 0.75, 
            fontSize: 18, 
            color: error ? "error.main" : "#977342" 
          }} 
        />
        {label}
      </Typography>
      <TextField
        type="datetime-local"
        value={value}
        onChange={handleDateChange}
        variant="outlined"
        fullWidth
        error={error}
        inputProps={{
          min: minDateTimeString
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <AccessTimeIcon 
                sx={{ 
                  color: error ? "error.main" : "#977342",
                  opacity: 0.7
                }} 
              />
            </InputAdornment>
          ),
        }}
        sx={{ 
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            transition: "all 0.3s ease-in-out",
            backgroundColor: error ? "rgba(211, 47, 47, 0.03)" : "rgba(151, 115, 66, 0.03)",
            "&:hover": {
              backgroundColor: error ? "rgba(211, 47, 47, 0.05)" : "rgba(151, 115, 66, 0.08)",
            },
            "&:hover fieldset": {
              borderColor: error ? "error.main" : "#977342",
              borderWidth: "1px"
            },
            "&.Mui-focused": {
              backgroundColor: error ? "rgba(211, 47, 47, 0.05)" : "rgba(151, 115, 66, 0.08)",
            },
            "&.Mui-focused fieldset": {
              borderColor: error ? "error.main" : "#977342",
              borderWidth: "2px"
            },
            "& fieldset": {
              borderColor: error ? "error.light" : "rgba(151, 115, 66, 0.3)",
            }
          },
          "& .MuiInputBase-input": {
            py: 1.75,
            px: 2,
            "&::-webkit-calendar-picker-indicator": {
              filter: error 
                ? "invert(21%) sepia(100%) saturate(3523%) hue-rotate(343deg) brightness(87%) contrast(83%)"
                : "invert(35%) sepia(11%) saturate(1663%) hue-rotate(351deg) brightness(98%) contrast(84%)",
              cursor: "pointer",
              opacity: 0.7,
              "&:hover": {
                opacity: 1
              }
            }
          },
          boxShadow: error ? "none" : "0 2px 8px rgba(151, 115, 66, 0.08)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: error ? "none" : "0 4px 12px rgba(151, 115, 66, 0.12)",
            transform: "translateY(-2px)",
          }
        }}
      />
      {helperText && (
        <FormHelperText
          error={error}
          sx={{
            ml: 1.5,
            mt: 0.75,
            fontSize: "0.75rem",
            fontWeight: error ? "medium" : "normal",
            display: "flex",
            alignItems: "flex-start",
            lineHeight: 1.4
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default DateTimePicker;