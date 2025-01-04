"use client";

import React from 'react';
import Header from '@/components/dashboard/Header'; // Adjust the path as necessary
import Footer from '@/components/dashboard/Footer'; // Adjust the path as necessary
import '@/styles/globals.css'; // Import global styles if needed

const Dashboard: React.FC = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: '20px' }}>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard! Here you can manage your settings, view analytics, and more.</p>
        
        {/* Add more dashboard components or sections here */}
        <section>
          <h2>Your Stats</h2>
          <div>
            {/* Example stats or cards */}
            <div style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}>
              <h3>Stat 1</h3>
              <p>Details about stat 1.</p>
            </div>
            <div style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}>
              <h3>Stat 2</h3>
              <p>Details about stat 2.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;