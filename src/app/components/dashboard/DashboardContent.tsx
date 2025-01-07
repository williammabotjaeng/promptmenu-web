"use client";

import React, { useState } from 'react';

const DashboardContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'messages' | 'projects'>('messages');

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

      {/* Third Column: Messages and Projects Tabs */}
      <div style={{ flex: 1 }}>
        <h2>Messages</h2>
        <div style={{ margin: '10px 0', padding: '10px', borderLeft: '1px solid #977342', borderTop: '1px solid #977342' }}>
          {/* Tab Navigation */}
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <button 
              onClick={() => setActiveTab('messages')} 
              style={{ 
                flex: 1, 
                padding: '10px', 
                backgroundColor: activeTab === 'messages' ? '#977342' : '#f0f0f0', 
                color: activeTab === 'messages' ? '#fff' : '#000', 
                border: 'none', 
                cursor: 'pointer' 
              }}
            >
              Messages
            </button>
            <button 
              onClick={() => setActiveTab('projects')} 
              style={{ 
                flex: 1, 
                padding: '10px', 
                backgroundColor: activeTab === 'projects' ? '#977342' : '#f0f0f0', 
                color: activeTab === 'projects' ? '#fff' : '#000', 
                border: 'none', 
                cursor: 'pointer' 
              }}
            >
              Projects
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'messages' && (
            <div>
              <h3>Messages with Talent</h3>
              <p>No new messages.</p>
            </div>
          )}
          {activeTab === 'projects' && (
            <div>
              <h3>Your Projects</h3>
              <p>No ongoing projects.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;