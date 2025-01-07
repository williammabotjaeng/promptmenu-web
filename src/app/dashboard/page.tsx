"use client";

import React from 'react';
import Header from '@/components/dashboard/Header'; 
import Footer from '@/components/dashboard/Footer'; 
import '@/styles/globals.css';
import DashboardContent from '@/components/dashboard/DashboardContent';

const Dashboard: React.FC = () => {
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