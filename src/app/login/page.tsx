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
import { Box } from '@mui/material'; 

const Login: React.FC = () => {
  const { login } = useAuth(); 
  const router = useRouter();

  useEffect(() => {
    const textElement = document.querySelector('.slide-in-text');
    if (textElement) {
      textElement.classList.add('animate');
    }
  }, []);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh', 
        backgroundColor: '#f5f5f5' 
      }}
    >
      <LoginForm /> {/* Pass the handleLogin function as a prop */}
    </Box>
  );
};

export default Login;