import * as React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { StepItem } from '@/components/portal/onboarding/StepItem';
import { PaymentMethod } from '@/components/portal/onboarding/PaymentMethod';
import { CardInput } from '@/components/portal/onboarding/CardInput';
import OnboardingHeader from '@/components/portal/onboarding/OnboardingHeader';
import { useRouter } from 'next/navigation';

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

const paymentMethods = [
  { label: "Credit Card", isActive: true },
  { label: "Bank Account" },
  { label: "PayPal" }
];

export const PaymentSection: React.FC<{ activeStep: number; setActiveStep: (step: number) => void; }> = ({ activeStep, setActiveStep }) => {
  const router = useRouter();

  const onClose = () => {
    router.push('/portal');
  };

  const handleContinue = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Box sx={{ display: 'flex', overflow: 'hidden', flexDirection: 'column', backgroundColor: 'white', borderRadius: '8px', border: '2px solid gray' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: 'black', paddingBottom: '24px' }}>
        {/* Header Section */}
        <OnboardingHeader steps={steps} onClose={onClose} />

        {/* Payment Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingX: 4, paddingTop: 4 }}>
          <Typography variant="h5" sx={{ color: 'orange', paddingBottom: 3 }}>
            Payment Methods
          </Typography>
          <Paper sx={{ display: 'flex', flexDirection: 'column', padding: 4, borderRadius: '8px', backgroundColor: 'rgba(75, 85, 99, 0.1)', width: '100%', maxWidth: '768px' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', py: 0.5, textAlign: 'center', borderBottom: '1px solid rgba(75, 85, 99, 0.2)', color: '#4B5563' }}>
              {paymentMethods.map((method) => (
                <PaymentMethod key={method.label} {...method} />
              ))}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 4, width: '100%' }}>
              <CardInput
                id="cardNumber"
                placeholder="Card Number"
                ariaLabel="Enter card number"
              />
              <Grid container spacing={4} sx={{ mt: 4 }}>
                <Grid item xs={6}>
                  <CardInput
                    id="expiry"
                    placeholder="MM/YY"
                    ariaLabel="Enter card expiry date"
                  />
                </Grid>
                <Grid item xs={6}>
                  <CardInput
                    id="cvc"
                    placeholder="CVC"
                    ariaLabel="Enter card CVC"
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingX: 4, marginTop: 4 }}>
          <Button 
            sx={{ color: '#977342', border: '2px solid #977342', '&:hover': { color: '#fff' } }} 
            onClick={handleBack}
          >
            Back
          </Button>
          <Button 
            sx={{ color: '#000', backgroundColor: '#CEAB76' }} 
            onClick={handleContinue}
          >
            Continue
          </Button>
        </Box>

        {/* Step Indicator Section */}
        <Typography variant="caption" sx={{ paddingX: 2, paddingY: 1, marginTop: 4, color: 'gray', textAlign: 'center' }}>
          Step {activeStep + 1} of 8 - Payment
        </Typography>
      </Box>
    </Box>
  );
};