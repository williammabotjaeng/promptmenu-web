"use client";

import React from 'react';
import Header from '@/components/portal/Header'; 
import Footer from '@/components/portal/Footer'; 
import '@/styles/globals.css';
import PortalContent from '@/components/portal/PortalContent';

const Dashboard: React.FC = () => {
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