"use client";

import React, { useState } from 'react';

const ClientOnboarding: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { title: "Step 1: Basic Information", content: "Please provide your basic information." },
    { title: "Step 2: Business Details", content: "Tell us about your business." },
    { title: "Step 3: Preferences", content: "Set your preferences." },
    { title: "Step 4: Review", content: "Review your information." },
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleSkip = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-content">
        <h2 style={{
            color: 'black !important'
        }}>{steps[activeStep].title}</h2>
        <p style={{
            color: 'black !important'
        }}>{steps[activeStep].content}</p>

        <div className="onboarding-buttons">
          <button onClick={handleNext} style={{
            backgroundColor: '#977342 !important',
            color: '#fff !important',
            borderRadius: '12px'
          }}>Next</button>
          <button onClick={handleSkip} style={{ marginLeft: '10px', backgroundColor: '#000 !important', color: '#977342 !important', borderRadius: '12px'   }}>Skip this for now</button>
        </div>
      </div>
    </div>
  );
};

export default ClientOnboarding;