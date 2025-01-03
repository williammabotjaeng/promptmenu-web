"use client";

import Header from '../components/Header';
import { useEffect } from 'react';
import RegisterForm from '../components/RegisterForm';
import '../styles/globals.css';

const Register: React.FC = () => {
  useEffect(() => {
    const textElement = document.querySelector('.slide-in-text');
    if (textElement) {
      textElement.classList.add('animate');
    }
  }, []);

  return (
    <div>
      <Header />
      <RegisterForm />
      <br />
      <p style={{
        textAlign: 'center'
      }}>&copy; 2025 Support Staffing Hub</p>
    </div>
  );
};

export default Register;