"use client";

import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAuth } from '@/providers/auth-providers';
import { redirect } from 'next/navigation';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const OTPForm: React.FC<{ username: string }> = ({ username }) => {
  const { verifyOtp } = useAuth();
  const [otp, setOtp] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await verifyOtp(username, otp);
      setSnackbarMessage('OTP verification successful!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      
      setTimeout(() => {     
            redirect('/login');
      }, 2000); 
    } catch (error) {
      console.error('OTP verification failed:', error);
      setSnackbarMessage('OTP verification failed. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ maxWidth: '400px', margin: '0 auto', padding: '20px', backgroundColor: 'var(--primary-bg)', color: 'var(--primary-text)', border: '2px solid #977342', borderRadius: '8px', fontFamily: 'Open Sans', outline: '2px solid #977342', outlineOffset: '4px', marginTop: '24px' }}>
      <h1 style={{ textAlign: 'center', color: 'var(--dark-gold)' }}>Verify OTP</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
        <TextField
          label="Enter OTP"
          name="otp"
          value={otp}
          onChange={handleChange}
          fullWidth
          required
          onFocus={(e) => e.target.style.color = "#977342"} 
          onBlur={(e) => e.target.style.color = "#977342"}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#977342",
                color: "#977342"
              },
              "&:hover fieldset": {
                borderColor: "#977342",
                color: "#977342"
              },
              "&.Mui-focused fieldset": {
                borderColor: "#977342",
                color: "#977342",
              },
              "&.Mui-filled fieldset": {
                borderColor: "#977342",
                color: "#977342",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#977342",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#977342",
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#977342",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#CEAB76",
            },
          }}
        >
          Verify OTP
        </Button>
      </form>

      {/* Snackbar for feedback */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OTPForm;