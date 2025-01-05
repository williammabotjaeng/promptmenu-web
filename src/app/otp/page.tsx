"use client";

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import OTPForm from '@/components/OTPForm';
import Snackbar from '@mui/material/Snackbar'; 
import Alert from '@mui/material/Alert'; 
import { useAuth } from '@/providers/auth-providers'; 
import '@/styles/globals.css';

const OTP: React.FC = () => {
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const textElement = document.querySelector('.slide-in-text');
    if (textElement) {
      textElement.classList.add('animate');
    }
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Header />
      <OTPForm username={"username"} />
      <br />
      <p style={{ textAlign: 'center' }}>&copy; 2025 Staffing Solutions Hub</p>

      {/* Snackbar for displaying messages */}
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
    </div>
  );
};

export default OTP;