import * as React from 'react';
import { Box, Typography, Grid, Paper, Button, TextField } from '@mui/material';
import { PaymentMethod } from '@/components/portal/onboarding/PaymentMethod';
import OnboardingHeader from '@/components/portal/onboarding/OnboardingHeader';
import { useRouter } from 'next/navigation';
import { OnboardingStepProps } from '@/types/Props/OnboardingStepProps';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';

const steps = [
  { number: 1, title: "Headshot", isActive: false },
  { number: 2, title: "Skills", isActive: false },
  { number: 3, title: "Payment", isActive: true },
  { number: 4, title: "Attributes", isActive: false },
  { number: 5, title: "Social", isActive: false },
  { number: 6, title: "ID", isActive: false },
  { number: 7, title: "Portfolio", isActive: false },
  { number: 8, title: "Review", isActive: false }
];

const paymentMethodsTab = [
  { label: "Credit Card", value: "creditCard" },
  { label: "Bank Account", value: "bankAccount" },
  { label: "PayPal", value: "paypal" }
];

export const PaymentSection: React.FC<OnboardingStepProps> = ({ activeStep, setActiveStep }) => {
  const [activePaymentMethod, setActivePaymentMethod] = useState<string>("creditCard");

  const { paymentMethods, setPaymentMethods } = useStore(useTalentOnboardingStore);

  const [paymentDetails, setPaymentDetails] = useState({
    ccNumber: paymentMethods?.ccNumber || '',
    ccFirstName: paymentMethods?.ccFirstName || '',
    ccLastName: paymentMethods?.ccLastName || '',
    ccExpiry: paymentMethods?.ccExpiry || '',
    ccCVC: paymentMethods?.ccCVC || '',
    paypalEmail: paymentMethods?.paypalEmail || '',
    stripeDetails: paymentMethods?.stripeDetails || ''
  });

  const router = useRouter();

  const onClose = () => {
    router.push('/portal');
  };

  const handleContinue = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    } else {
      router.push('/portal');
    }
  };


  useEffect(() => {
    if (paymentMethods) {
      setPaymentDetails({
        ccNumber: paymentMethods.ccNumber || '',
        ccFirstName: paymentMethods.ccFirstName || '',
        ccLastName: paymentMethods.ccLastName || '',
        ccExpiry: paymentMethods.ccExpiry || '',
        ccCVC: paymentMethods.ccCVC || '',
        paypalEmail: paymentMethods.paypalEmail || '',
        stripeDetails: paymentMethods.stripeDetails || ''
      });
    }
  }, [paymentMethods]);

  const renderPaymentForm = () => {
    switch (activePaymentMethod) {
      case "paypal":
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" sx={{ mb: 2, color: '#977342' }}>
              Enter your PayPal email:
            </Typography>
            <TextField
              fullWidth
              placeholder="PayPal Email"
              variant="outlined"
              value={paymentDetails.paypalEmail}
              sx={{
                backgroundColor: 'white',
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#977342',
                  },
                  '&:hover fieldset': {
                    borderColor: '#CEAB76',
                  },
                },
              }}
            />
          </Box>
        );
      case "bankAccount":
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" sx={{ mb: 2, color: '#977342' }}>
              Enter your banking details:
            </Typography>
            <TextField
              fullWidth
              placeholder="Account Number"
              variant="outlined"
              sx={{
                mb: 2,
                backgroundColor: 'white',
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#977342',
                  },
                  '&:hover fieldset': {
                    borderColor: '#CEAB76',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              placeholder="Bank Name"
              variant="outlined"
              sx={{
                mb: 2,
                backgroundColor: 'white',
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#977342',
                  },
                  '&:hover fieldset': {
                    borderColor: '#CEAB76',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              placeholder="IBAN"
              variant="outlined"
              sx={{
                backgroundColor: 'white',
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#977342',
                  },
                  '&:hover fieldset': {
                    borderColor: '#CEAB76',
                  },
                },
              }}
            />
          </Box>
        );
      default:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" sx={{ mb: 2, color: '#977342' }}>
              Enter your credit card details:
            </Typography>
            <TextField
              fullWidth
              placeholder="Card Number"
              variant="outlined"
              value={paymentDetails.ccNumber}
              sx={{
                mb: 2,
                backgroundColor: 'white',
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#977342',
                  },
                  '&:hover fieldset': {
                    borderColor: '#CEAB76',
                  },
                },
              }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  placeholder="MM/YY"
                  variant="outlined"
                  value={paymentDetails.ccExpiry}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#977342',
                      },
                      '&:hover fieldset': {
                        borderColor: '#CEAB76',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  placeholder="CVC"
                  value={paymentDetails.ccCVC}
                  variant="outlined"
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#977342',
                      },
                      '&:hover fieldset': {
                        borderColor: '#CEAB76',
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'black', minHeight: '100vh' }}>
      {/* Header Section */}
      <OnboardingHeader steps={steps} onClose={onClose} />

      {/* Payment Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingX: { xs: 2, md: 4 }, paddingTop: 4 }}>
        <Typography
          variant="h5"
          sx={{
            color: '#977342',
            paddingBottom: 3,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Payment Methods
        </Typography>

        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 4,
            borderRadius: '8px',
            backgroundColor: 'rgba(151, 115, 66, 0.05)',
            width: '100%',
            maxWidth: '768px',
          }}
        >
          {/* Payment Method Tabs */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              py: 0.5,
              textAlign: 'center',
              borderBottom: '1px solid rgba(75, 85, 99, 0.2)',
              color: '#4B5563',
            }}
          >
            {paymentMethodsTab.map((method) => (
              <PaymentMethod
                key={method.value}
                label={method.label}
                isActive={activePaymentMethod === method.value}
                onClick={() => setActivePaymentMethod(method.value)}
              />
            ))}
          </Box>

          {/* Render Payment Form */}
          {renderPaymentForm()}
        </Paper>
      </Box>

      {/* Navigation Buttons */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: { xs: 'flex-start', md: 'space-between' },
          marginTop: 4,
          width: { xs: '100%', md: '55%' },
          paddingX: 2,
          alignItems: { md: 'center' },
          marginLeft: { xs: 'auto', md: '20%' },
        }}
      >
        <Button
          sx={{
            color: '#977342',
            border: '2px solid #977342',
            '&:hover': { color: '#fff' },
            marginBottom: { xs: 1, md: 0 },
          }}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          sx={{
            color: '#000',
            backgroundColor: '#CEAB76',
            '&:hover': { backgroundColor: '#b08a5c' },
          }}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};