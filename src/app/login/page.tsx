"use client";

import Header from '../components/Header';
import { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/globals.css';

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
        textAlign: 'center'
      }}>&copy; 2025 Support Staffing Hub</p>
    </div>
  );
};

export default Login;