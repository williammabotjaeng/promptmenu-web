"use client";

import React, { useState } from 'react';

const DashboardContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inprogress' | 'completed'>('inprogress');

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      {/* First Column: Stats */}
      <div style={{ flex: 1, marginRight: '10px' }}>
        <h2>Stats</h2>
        <div style={{ margin: '10px 0', padding: '10px' }}>
          <h1>{0}</h1>
          <p>Number of Jobs Posted</p>
        </div>
        <div style={{ margin: '10px 0', padding: '10px' }}>
          <h1>{0}</h1>
          <p>Projects Completed</p>
        </div>
        <div style={{ margin: '10px 0', padding: '10px' }}>
          <h1>{0}</h1>
          <p>Talent Engaged</p>
        </div>
      </div>

      {/* Second Column: Profile Standing */}
      <div style={{ flex: 1, marginRight: '10px' }}>
        <h2>Profile Standing</h2>
        <div style={{ margin: '10px 0', padding: '10px' }}>
          <h1>75% Complete</h1>
          <p>Profile Completion</p>
        </div>
        <div style={{ margin: '10px 0', padding: '10px' }}>
          <h1>{"Not Started"}</h1>
          <p>Verification Status</p>
        </div>
      </div>

      {/* Third Column: Projects Tabs */}
      <div style={{ flex: 1 }}>
        <h2>Projects</h2>
        <div style={{ margin: '10px 0', padding: '10px', borderLeft: '1px solid #977342', borderTop: '1px solid #977342' }}>
          {/* Tab Navigation */}
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <button 
              onClick={() => setActiveTab('inprogress')} 
              style={{ 
                flex: 1, 
                padding: '10px', 
                backgroundColor: activeTab === 'inprogress' ? '#977342' : '#f0f0f0', 
                color: activeTab === 'inprogress' ? '#fff' : '#000', 
                border: 'none', 
                cursor: 'pointer' 
              }}
            >
              In Progress
            </button>
            <button 
              onClick={() => setActiveTab('completed')} 
              style={{ 
                flex: 1, 
                padding: '10px', 
                backgroundColor: activeTab === 'completed' ? '#977342' : '#f0f0f0', 
                color: activeTab === 'completed' ? '#fff' : '#000', 
                border: 'none', 
                cursor: 'pointer' 
              }}
            >
              Completed
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'inprogress' && (
            <div>
              <h3>In Progress Projects</h3>
              <p>No running projects.</p>
            </div>
          )}
          {activeTab === 'completed' && (
            <div>
              <h3>Completed</h3>
              <p>No completed projects.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;