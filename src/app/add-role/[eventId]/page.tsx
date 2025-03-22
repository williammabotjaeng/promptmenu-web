"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Typography, 
  Paper, 
  Container,
  Button,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  LinearProgress,
  Fade,
  Grow
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddRoleForm from '@/components/dashboard/event/AddRoleForm';
import RoleDetails from '@/components/dashboard/event/RoleDetails';
import RoleDemographics from '@/components/dashboard/event/RoleDemographics';
import { PaymentDetails } from '@/components/dashboard/event/PaymentDetails';
import Questions from '@/components/dashboard/event/Questions';
import EventDeadline from '@/components/dashboard/event/page/EventDeadline';

const AddRole: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define all steps
  const steps = [
    { 
      title: "Role Information", 
      description: "Basic details about the role",
      component: <AddRoleForm activeStep={activeStep} setActiveStep={setActiveStep} />
    },
    { 
      title: "Role Details", 
      description: "Specific requirements and responsibilities",
      component: <RoleDetails activeStep={activeStep} setActiveStep={setActiveStep} />
    },
    { 
      title: "Demographics", 
      description: "Target candidate specifications",
      component: <RoleDemographics activeStep={activeStep} setActiveStep={setActiveStep} />
    },
    { 
      title: "Payment", 
      description: "Compensation information",
      component: <PaymentDetails activeStep={activeStep} setActiveStep={setActiveStep} />
    },
    { 
      title: "Questions", 
      description: "Application questionnaire",
      component: <Questions activeStep={activeStep} setActiveStep={setActiveStep} />
    },
    { 
      title: "Deadlines", 
      description: "Important dates and timelines",
      component: <EventDeadline activeStep={activeStep} setActiveStep={setActiveStep} />
    },
  ];

  // Calculate completion percentage
  const completionPercentage = ((activeStep) / (steps.length - 1)) * 100;

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      
      // Mark the current step as completed
      setCompleted((prev) => ({
        ...prev,
        [activeStep]: true
      }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log("Role submitted successfully!");
      router.push('/dashboard');
    }, 1500);
  };

  const isLastStep = activeStep === steps.length - 1;

  return (
    <Container maxWidth="lg" sx={{ backgroundColor: 'white', py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: 2, 
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}
      >
        {/* Header with progress */}
        <Box 
          sx={{ 
            p: 3, 
            bgcolor: '#f8f9fa', 
            borderBottom: '1px solid #eaeaea'
          }}
        >
          <Typography variant="h5" component="h1" fontWeight={600} gutterBottom>
            Add New Role
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Box sx={{ flexGrow: 1, mr: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={completionPercentage} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#977342',
                  }
                }} 
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {Math.round(completionPercentage)}%
            </Typography>
          </Box>
        </Box>

        {/* Stepper - visible only on larger screens */}
        {!isMobile && (
          <Box sx={{ p: 3, borderBottom: '1px solid #eaeaea' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((step, index) => (
                <Step key={step.title} completed={completed[index]}>
                  <StepLabel>
                    <Typography variant="body2" fontWeight={500}>
                      {step.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {step.description}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}

        {/* Current step information for mobile */}
        {isMobile && (
          <Box sx={{ px: 3, pt: 2, pb: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              Step {activeStep + 1}: {steps[activeStep].title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {steps[activeStep].description}
            </Typography>
          </Box>
        )}

        {/* Content area */}
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Fade in={true} key={activeStep}>
            <Box>
              {steps[activeStep].component}
            </Box>
          </Fade>
        </Box>

      </Paper>

      {/* Help card */}
      <Grow in={true}>
        <Card 
          sx={{ 
            mt: 3, 
            borderRadius: 2,
            border: '1px solid #e0e0e0',
            boxShadow: 'none'
          }}
        >
          <CardContent>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Need Help?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Our team is here to assist you with creating your role posting.
              If you have any questions, please contact support at support@mixfame.com or call +971 4 123 4567.
            </Typography>
          </CardContent>
        </Card>
      </Grow>
    </Container>
  );
};

export default AddRole;