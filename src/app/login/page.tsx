"use client";

import Header from '@/components/Header';
import { useEffect } from 'react';
import LoginForm from '@/components/LoginForm';
import '@/styles/globals.css';

const Login: React.FC = () => {
  useEffect(() => {
    const textElement = document.querySelector('.slide-in-text');
    if (textElement) {
      textElement.classList.add('animate');
    }
  }, []);

  return (
    <div>
      <Header />
      <LoginForm />
      <br />
      <p style={{
        textAlign: 'center',
        borderTop: '8px solid #977342',
        width: '100vw',
        marginTop: '12px',
        padding: '4px'
      }}>&copy; 2025 Staffing Solutions Hub</p>
    </div>
  );
};

export default Login;