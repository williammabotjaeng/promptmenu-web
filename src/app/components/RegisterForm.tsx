"use client";

import { RegistrationData } from '@/types/RegistrationData';
import Link from 'next/link';
import React, { useState } from 'react';

interface RegisterFormProps {
  onRegister: (userData: RegistrationData) => void; 
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    user_roles: '',
    email: '',
    firstname: '',
    lastname: '',
    date_of_birth: '',
    password: '',
    confirmPassword: '',
    username: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await onRegister(formData); 
      // Optionally, handle successful registration (e.g., show a message or redirect)
    } catch (error) {
      console.error('Registration failed:', error);
      // Optionally, handle registration error (e.g., show an error message)
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        
        {/* Radio Buttons for Client/Talent */}
        <div style={{ gridColumn: 'span 1' }}>
          <label style={{ margin: '2px' }}>Register as:</label>
          <div>
            <label className='form-check-label p-1'>
              <input type="radio" name="user_roles" value="client" required className='form-check-input' onChange={handleChange} />
              &nbsp;Client
            </label>
            <label style={{ marginLeft: '20px' }} className='form-check-label'>
              <input type="radio" name="user_roles" value="talent" required className='form-check-input' onChange={handleChange} />
              &nbsp;Talent
            </label>
          </div>
        </div>

        {/* Email Field */}
        <div style={{ gridColumn: 'span 2' }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            onChange={handleChange}
          />
        </div>

        {/* First Name */}
        <div>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Enter your first name"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            onChange={handleChange}
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Enter your last name"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            onChange={handleChange}
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="date_of_birth">Date of Birth</label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            onChange={handleChange}
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter your password"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <div style={{ gridColumn: 'span 4', textAlign: 'center', marginTop: '20px' }}>
          <span style={{ display: 'flex', flexDirection: 'row' }}>
            <input style={{ display: 'inline' }} type="checkbox" className='form-check-input' required />
            &nbsp;&nbsp;<span style={{ display: 'inline', textWrap: 'nowrap' }}>By clicking here and going to the next step I declare that I have read and accept the <Link href="/">Ts & Cs</Link> of SSH.</span>
          </span>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              marginTop: '4px',
              backgroundColor: '#977342',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;