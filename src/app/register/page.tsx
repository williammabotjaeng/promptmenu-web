"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import RegisterForm from '@/components/RegisterForm';
import Snackbar from '@mui/material/Snackbar'; 
import Alert from '@mui/material/Alert'; 
import { useAuth } from '@/providers/auth-providers';
import '@/styles/globals.css';
import { RegistrationData } from '@/types/RegistrationData';

const Register: React.FC = () => {
  const { register } = useAuth();
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Extract user_role from query parameters
  const { searchParams } = new URL(window.location.href);
  const userRole = searchParams.get('type') === 'talent' ? 'client' : 'talent'; 
  useEffect(() => {
    const textElement = document.querySelector('.slide-in-text');
    if (textElement) {
      textElement.classList.add('animate');
    }
  }, []);
  
  const handleRegister = async (userData: RegistrationData) => {
    try {
      await register(
        userData.date_of_birth,
        userData.email,
        userData.firstname,
        userData.lastname,
        userData.password,
        userRole, 
        userData.username,
        userData.gender,
        userData.phonenumber
      ); 
      setSnackbarMessage('User registered successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      
      setTimeout(() => {
        router.push('/login'); 
      }, 2000); 
    } catch (error) {
      console.error('Registration failed:', error);
      setSnackbarMessage('Registration failed. Please try again.');
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
      <RegisterForm userRole={userRole} onRegister={handleRegister} /> {/* Pass userRole to RegisterForm */}
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

export default Register;