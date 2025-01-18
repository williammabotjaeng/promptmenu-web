"use client";

import React, { useEffect } from 'react';
import { Header } from '@/components/dashboard/Header'; 
import Footer from '@/components/dashboard/Footer'; 
import '@/styles/globals.css';
import DashboardContent from '@/components/dashboard/DashboardContent';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

const Dashboard: React.FC = () => {

  const router = useRouter();
  const [cookies] = useCookies(['user_role']);
  
  const user_role = cookies?.user_role;

  useEffect(() => {
   
    if (user_role === 'talent') router.push('/portal');
  }, [])

  return (
    <div>
      <Header />
      <main style={{ padding: '10px' }}>
        <DashboardContent />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;