"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';
import Snackbar from '@mui/material/Snackbar'; 
import Alert from '@mui/material/Alert'; 
import useAuth from '@/hooks/use-auth'; 
import '@/styles/globals.css';
import { LoginData } from '@/types/types'; 

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

  const handleLogin = async (userData: LoginData) => {
    try {
      await login.mutateAsync(userData);
      setSnackbarMessage('Login successful!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      
      // Redirect to the dashboard or home page after successful login
      setTimeout(() => {
        router.push('/dashboard'); 
      }, 2000); 
    } catch (error) {
      console.error('Login failed:', error);
      setSnackbarMessage('Login failed. Please check your credentials.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Header />
      <LoginForm onLogin={handleLogin} /> {/* Pass the handleLogin function as a prop */}
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

export default Login;