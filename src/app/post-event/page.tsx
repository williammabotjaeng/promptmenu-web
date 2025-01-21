"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import EventInfo from '@/components/dashboard/event/EventInfo';
import { EventMedia } from '@/components/dashboard/event/EventMedia';
import { EventReview } from '@/components/dashboard/event/EventReview';
import { EventDetails } from '@/components/dashboard/event/EventDetails';
import AddRoleForm from '@/components/dashboard/event/AddRoleForm';
import RoleDetails from '@/components/dashboard/event/RoleDetails';
import RoleDemographics from '@/components/dashboard/event/RoleDemographics';
import { PaymentDetails } from '@/components/dashboard/event/PaymentDetails';
import Questions from '@/components/dashboard/event/Questions';

const PostEvent: React.FC = () => {
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

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

        console.log("Event submitted!");
        router.push('/dashboard');
    };

    return (
        <Box sx={{ width: '100%' }}>
                {/* Render input fields based on the active step */}
                {activeStep === 0 && (
                    <EventDetails activeStep={activeStep} setActiveStep={setActiveStep} />
                )}
                {activeStep === 1 && (
                    <EventMedia activeStep={activeStep} setActiveStep={setActiveStep} />
                )}
                {activeStep === 2 && (
                    <EventReview activeStep={activeStep} setActiveStep={setActiveStep} />
                )}

                {activeStep === 3 && (
                    <AddRoleForm activeStep={activeStep} setActiveStep={setActiveStep} />
                )}

                {activeStep === 4 && (
                    <RoleDetails activeStep={activeStep} setActiveStep={setActiveStep} />
                )}

                {activeStep === 5 && (
                    <RoleDemographics activeStep={activeStep} setActiveStep={setActiveStep} />
                )}

                {activeStep === 6 && (
                    <PaymentDetails activeStep={activeStep} setActiveStep={setActiveStep} />
                )}

                {activeStep === 7 && (
                    <Questions activeStep={activeStep} setActiveStep={setActiveStep} />
                )}

                {activeStep === 8 && (
                    <EventReview activeStep={activeStep} setActiveStep={setActiveStep} />
                )}

                {activeStep === 9 && (
                    <EventReview activeStep={activeStep} setActiveStep={setActiveStep} />
                )}
        </Box>
    );
};

export default PostEvent;