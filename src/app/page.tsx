"use client";

import Header from './components/Header';
import { useEffect } from 'react';
import Hero from './components/Hero';
import '../app/styles/globals.css';

const Home: React.FC = () => {
  useEffect(() => {
    const textElement = document.querySelector('.slide-in-text');
    if (textElement) {
      textElement.classList.add('animate');
    }
  }, []);

  return (
    <div>
      <Header />
      <Hero />
      <br />
      <p style={{
        textAlign: 'center'
      }}>&copy; 2025 Staffing Solutions Hub</p>
    </div>
  );
};

export default Home;