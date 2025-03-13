"use client";

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { ForgotForm } from '@/components/ForgotForm';
import Snackbar from '@mui/material/Snackbar'; 
import Alert from '@mui/material/Alert'; 
import useUserStore from '@/state/use-user-store';
import '@/styles/globals.css';

const Forgot: React.FC = () => {

  return (
    <>
      <ForgotForm />
    </>
  );
};

export default Forgot;