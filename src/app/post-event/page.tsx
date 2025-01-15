"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import EventInfo from '@/components/dashboard/event/EventInfo'; 
import EventMedia from '@/components/dashboard/event/EventMedia'; 
import EventReview from '@/components/dashboard/event/EventReview'; 

const PostEvent: React.FC = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "Step 1: Event Information", content: "Please provide your event information." },
    { title: "Step 2: Event Media", content: "Upload media related to your event." },
    { title: "Step 3: Review & Submit", content: "Review your event details and submit." },
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

  const handleSubmit = async () => {
    // Implement your submit logic here
    console.log("Event submitted!");
    router.push('/dashboard'); 
  };

  return (
    <Box className="event-creation-container" sx={{
        background: 'linear-gradient(135deg, #977342 0%, #b89a5a 50%, #d1c1a0 100%)',
        padding: '20px',
        borderRadius: '8px',
        height: '100vh'
    }}>
      <div className="event-creation-content">
        <h2 style={{ color: 'black' }}>{steps[activeStep].title}</h2>
        <p style={{ color: 'black' }}>{steps[activeStep].content}</p>

        {/* Render input fields based on the active step */}
        {activeStep === 0 && (
          <EventInfo activeStep={activeStep} />
        )}
        {activeStep === 1 && (
          <EventMedia activeStep={activeStep} />
        )}
        {activeStep === 2 && (
          <EventReview />
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
        </div>
      </div>
    </Box>
  );
};

export default PostEvent;