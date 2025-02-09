"use client";

import * as React from 'react';
import { PaymentInput } from './PaymentInput';
import { Box, Typography, Button } from '@mui/material';
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import RoleHeaderWithProgressBar from './RoleHeaderWithProgressBar';
import { useState } from 'react';
import { useStore } from 'zustand';
import useEventStore from '@/state/use-event-store';

export const PaymentDetails: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep }) => {

    const { eventRole, setEventRole } = useStore(useEventStore);

    const [paymentTerms, setPaymentTerms] = useState(eventRole?.paymentTerms || '');
  
    const handleContinue = () => {
        setActiveStep(activeStep + 1);
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    }

    function handlePaymentTerms(event: React.ChangeEvent<any>): void {
        setPaymentTerms(event?.target?.value);
        setEventRole({
            ...eventRole,
            paymentTerms: event?.target?.value
        });
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            justifyContent: 'center',
            padding: { xs: 2, md: 4 }, 
            pb: { xs: 10, md: 4 },
        }}>
            <RoleHeaderWithProgressBar progressValue={72} indexValue={3} />

            <form style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignSelf: 'center', 
                padding: "15px", 
                marginTop: '20px', 
                marginLeft: '15px', 
                backgroundColor: 'white', 
                borderRadius: '16px', 
                boxShadow: '0px 4px 6px rgba(0,0,0,0.1)', 
                width: '100%',
                maxWidth: '100%' 
            }}>
                <Typography variant="h4" sx={{ pb: 2, color: '#977342' }}>
                    Payment Details
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, width: '100%', color: 'black' }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        <PaymentInput label="Per Hour" id="hourlyPay" />
                        <PaymentInput label="Per Day" id="dailyPay" />
                        <PaymentInput label="Per Project" id="projectPay" />
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                        <label htmlFor="paymentTerms" style={{ padding: '8px 0', fontWeight: 'bold' }}>
                            Payment Terms
                        </label>
                        <textarea
                            id="paymentTerms"
                            style={{ 
                                marginTop: '8px', 
                                height: '128px', 
                                backgroundColor: 'white', 
                                borderRadius: '8px', 
                                border: '1px solid #D1D5DB', 
                                width: '100%', 
                                resize: 'none' 
                            }}
                            onChange={handlePaymentTerms}
                            value={paymentTerms}
                            aria-label="Enter payment terms"
                        />
                    </Box>
                </Box>
            </form>

            <Box sx={{ display: 'flex', gap: 2, alignSelf: 'flex-end', mt: 4, mr: { xs: 0, md: 0 }, textAlign: 'center' }}>
                <Button onClick={handleBack} sx={{ color: '#977342', border: '2px solid #977342'}}>Go Back</Button>
                <Button onClick={handleContinue} sx={{ color: 'white', backgroundColor: '#977342' }}>Next Step</Button>
            </Box>
        </Box>
    );
};

export default PaymentDetails;