"use client";

import { RegistrationData } from '@/types/RegistrationData';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAuth } from '@/providers/auth-providers';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { redirect } from 'next/navigation';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    user_roles: '',
    email: '',
    firstname: '',
    lastname: '',
    date_of_birth: '',
    password: '',
    confirmPassword: '',
    username: '',
    gender: '',
    phoneNumber: ''
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [gender, seGender] = useState('Male');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const clientURL = process.env.NEXT_PUBLIC_CLIENT_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(
        formData.username,
        formData.password,
        formData.email,
        formData.date_of_birth,
        formData.user_roles,
        formData.firstname,
        formData.lastname,
        formData.gender,
        formData.phoneNumber
      ); 
      
      // Show success message and redirect to login
      setSnackbarMessage('Registration successful! Redirecting to login...');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      
      // Redirect after a short delay
      setTimeout(() => {
        redirect('/login')
      }, 3000); 

    } catch (error: any) {
      console.error('Registration failed:', error);
      let errorMessage = 'Registration failed. Please try again.';
      
      // Handle specific error messages
      if (error?.response) {
        if (error?.response.data.message.includes('unique constraint')) {
          errorMessage = 'Email or username already exists.';
        }
      }

      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
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

        {/* Username Field */}
        <div style={{ gridColumn: 'span 2' }}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            onChange={handleChange}
          />
        </div>

        {/* Username Field */}
        <div style={{ gridColumn: 'span 1' }}>
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" required style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
              <option value="" disabled selected>Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
          </select>
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

        {/* Phone Number */}
        <div>
          <label htmlFor="phonenumber">Phone Number</label>
          <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            placeholder="Enter your Phone Number"
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

      {/* Snackbar for feedback */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegisterForm;