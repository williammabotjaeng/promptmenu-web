"use client";

import Header from '../components/Header';
import { useEffect } from 'react';
import ContactCard from '../components/ContactCard';
import '../styles/globals.css';

const Contact: React.FC = () => {
  useEffect(() => {
    const textElement = document.querySelector('.slide-in-text');
    if (textElement) {
      textElement.classList.add('animate');
    }
  }, []);

  return (
    <div>
      <Header />
      <ContactCard />
      <br />
      <p style={{
        textAlign: 'center',
        borderTop: '8px solid #977342',
        width: '100vw',
        marginTop: '12px',
        padding: '4px'
      }}>&copy; 2025 Support Staffing Hub</p>
    </div>
  );
};

export default Contact;