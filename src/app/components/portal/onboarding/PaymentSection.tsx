import * as React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { StepItem } from '@/components/portal/onboarding/StepItem';
import { PaymentMethod } from '@/components/portal/onboarding/PaymentMethod';
import { CardInput } from '@/components/portal/onboarding/CardInput';

const steps = [
  { number: 1, title: "Headshot" },
  { number: 2, title: "Skills" },
  { number: 3, title: "Payment", isActive: true },
  { number: 4, title: "Attributes" },
  { number: 5, title: "Social" },
  { number: 6, title: "ID" },
  { number: 7, title: "Portfolio" },
  { number: 8, title: "Review" }
];

const paymentMethods = [
  { label: "Credit Card", isActive: true },
  { label: "Bank Account" },
  { label: "PayPal" }
];

export const PaymentSection: React.FC = () => {
  return (
    <Box className="flex overflow-hidden flex-col bg-white rounded-lg border-2 border-gray-300">
      <Box className="flex flex-col w-full bg-black pb-[786px] max-md:pb-24">
        <Box className="flex flex-wrap gap-5 justify-between items-start px-6 pt-6 pb-1 w-full text-2xl font-bold text-orange-300">
          <Typography variant="h5" sx={{ py: 1 }}>
            Staffing Solutions Hub
          </Typography>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/f2cd4e52e0a4cd669795e18c4d81145abb8e026c073e52d1fcca203b0a305f74?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt=""
            style={{ objectFit: 'contain', width: '18px' }}
          />
        </Box>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/04941e81747f3ecb6811e1684b15614793214440d6dff851abf37ed98ca1961c?apiKey=7fae980a988640eea8add1e49a5d542e&"
          alt=""
          style={{ objectFit: 'contain', zIndex: 10, marginTop: '-44px', marginLeft: '128px', maxWidth: '100%', width: '121px' }}
        />
        <Box className="flex z-10 flex-col items-center px-16 -mt-24 w-full text-white">
          <Box className="flex gap-5 justify-between pl-3 ml-6 max-w-full">
            {steps.map((step) => (
                        <StepItem
                          key={step.number}
                          number={step.number}
                          title={step.title}
                          isActive={step.isActive}
                        />
                      ))}
          </Box>
        </Box>
        <Box className="flex flex-col items-center self-center px-20 mt-14 ml-3 w-full text-base max-w-[1248px]">
          <Paper className="flex flex-col p-8 max-w-full rounded-xl bg-[#4B5563]/10 w-[768px]">
            <Typography variant="h5" sx={{ pt: 0.25, pb: 2.5, color: 'orange' }}>
              Payment Methods
            </Typography>
            <Box className="flex flex-wrap py-0.5 pr-20 mt-6 text-center border-b border-[#4B5563]/20 text-[#4B5563]">
              {paymentMethods.map((method) => (
                <PaymentMethod key={method.label} {...method} />
              ))}
            </Box>
            <Box className="flex flex-col mt-6 w-full">
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
        <Typography variant="caption" sx={{ px: 16, py: 7, mt: 20, mb: 0, ml: 5, color: 'gray', textAlign: 'center' }}>
          Step 3 of 8 - Payment
        </Typography>
      </Box>
    </Box>
  );
};