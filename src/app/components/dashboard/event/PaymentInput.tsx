import React from 'react';
import { TextField, Box, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface PaymentInputProps {
  label: string;
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  hint?: string;
}

export const PaymentInput: React.FC<PaymentInputProps> = ({ 
  label, 
  id, 
  value, 
  onChange, 
  error,
  hint
}) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      flex: '1 1 0',
      minWidth: { xs: '100%', sm: '200px' }
    }}>
      <Typography 
        component="label" 
        htmlFor={id} 
        sx={{ 
          fontWeight: 'bold', 
          mb: 1,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {label}
      </Typography>
      
      <TextField
        id={id}
        name={id}
        placeholder="0"
        value={value}
        onChange={onChange}
        variant="outlined"
        type="number"
        InputProps={{
          startAdornment: <AttachMoneyIcon sx={{ color: '#977342', mr: 1 }} />,
          sx: {
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#977342',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#977342',
              },
            }
          }
        }}
        error={!!error}
        helperText={error || hint}
        FormHelperTextProps={{
          sx: {
            color: error ? 'error.main' : 'text.secondary',
            fontSize: '0.75rem',
            mt: 0.5
          }
        }}
      />
    </Box>
  );
};

export default PaymentInput;