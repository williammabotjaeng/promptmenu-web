"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { LoginForm } from '@/components/LoginForm';
import Snackbar from '@mui/material/Snackbar'; 
import Alert from '@mui/material/Alert'; 
import { useAuth } from '@/providers/auth-providers'; 
import '@/styles/globals.css';
import { LoginData } from '@/types/LoginData'; 

const Login: React.FC = () => {
  const { login } = useAuth(); 
  const router = useRouter();
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
      <LoginForm /> {/* Pass the handleLogin function as a prop */}

      {/* Snackbar for displaying messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose}  sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;