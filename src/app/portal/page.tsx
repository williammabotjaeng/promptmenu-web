"use client";

import React, { useEffect } from 'react';
import Header from '@/components/portal/Header'; 
import Footer from '@/components/portal/Footer'; 
import '@/styles/globals.css';
import PortalContent from '@/components/portal/PortalContent';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

const Dashboard: React.FC = () => {

  const [cookies] = useCookies(['user_role']);

  const router = useRouter();

  const user_role = cookies?.user_role;

  useEffect(() => {
    console.log("User Role", user_role);
    if (user_role === 'client') router.push('/dashboard');
  }, [])

  return (
    <div>
      <Header />
      <main style={{ padding: '10px' }}>
        <PortalContent />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;