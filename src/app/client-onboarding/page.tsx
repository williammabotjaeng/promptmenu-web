"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { useOnboarding } from '@/providers/onboarding-providers';
import { Box } from '@mui/material';
import { Grid, TextField } from '@mui/material';
import PaymentMethod from '@/components/dashboard/onboarding/PaymentMethods';
import CompanyInfo from '@/components/dashboard/onboarding/CompanyInfo';
import AddressAndContactInfo from '@/components/dashboard/onboarding/AddressContactInfo';
import SocialMediaLinks from '@/components/dashboard/onboarding/SocialMediaLinks';
import CompanyReview from '@/components/dashboard/onboarding/CompanyReview';
import { useStore } from 'zustand';

const ClientOnboarding: React.FC = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['companyData']);
  const [activeStep, setActiveStep] = useState(0);
  const { createCompany } = useOnboarding();

  const steps = [
    { title: "Step 1: Basic Information", content: "Please provide your basic information." },
    { title: "Step 2: Business Details", content: "Tell us about your business." },
    { title: "Step 3: Preferences", content: "Set your preferences." },
    { title: "Step 4: Social Medial Links", content: "Your Website & Social Media Links." },
    { title: "Step 5: Submit", content: "Review & Submit your information." },
  ];
    

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };

  const handleSubmit = async () => {
    // createCompany();  
    router.push('/dashboard');
  };

  return (
    <Box className="onboarding-container" sx={{
      width: '100vw'
    }}>
      <div className="onboarding-content">
        <h2 style={{ color: 'black' }}>{steps[activeStep].title}</h2>
        <p style={{ color: 'black' }}>{steps[activeStep].content}</p>

        {/* Render input fields based on the active step */}
        {activeStep === 0 && (
          <CompanyInfo activeStep={activeStep}  />
        )}
        {activeStep === 1 && (
          <AddressAndContactInfo activeStep={activeStep} />
        )}
        {activeStep === 2 && (
          <PaymentMethod activeStep={activeStep} />
        )}
        {activeStep === 3 && (
          <SocialMediaLinks activeStep={activeStep} />
        )}
        {activeStep === 4 && (
          <CompanyReview />
        )}
        <br />
        <br />
        <div>
          {activeStep > 0 && (
            <button onClick={handleBack} style={{ marginRight: '10px', backgroundColor: '#000', color: '#977342', borderRadius: '12px' }}>
              Back
            </button>
          )}
          {activeStep < steps.length - 1 && (
            <button onClick={handleNext} style={{ backgroundColor: '#977342', color: '#fff', borderRadius: '12px' }}>
              Next
            </button>
          )}
          {activeStep === steps.length - 1 && (
            <button onClick={handleSubmit} style={{ backgroundColor: '#977342', color: '#fff', borderRadius: '12px' }}>
              Submit
            </button>
          )}
          <button onClick={handleSkip} style={{ marginLeft: '10px', backgroundColor: '#000', color: '#977342', borderRadius: '12px' }}>
            Skip this for now
          </button>
        </div>
      </div>

    </Box>
  );
};

export default ClientOnboarding;