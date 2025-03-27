import * as React from "react";
import { Box, Button, Typography, Card, Fade, Divider } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import RoleHeaderWithProgressBar from "@/components/dashboard/event/RoleHeaderWithProgressBar";
import FormSection from "@/components/dashboard/event/FormSection";
import { useCookies } from "react-cookie";
import { useStore } from "zustand";
import useEventStore from "@/state/use-event-store";
import { useState, useEffect } from "react";

const Questions: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep }) => {
    const [cookies] = useCookies(['questions']);
    const { eventRole, setEventRole } = useStore(useEventStore);
    const [animate, setAnimate] = useState(false);
    
    useEffect(() => {
        setAnimate(true);
    }, []);

    const handleContinue = () => {
        setEventRole({
            ...eventRole,
            questions: Array.from(cookies['questions'] || [])
        });
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const numQuestions = cookies['questions'] ? Array.from(cookies['questions']).length : 0;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 2,
                paddingRight: 2,
                pb: { xs: 3, md: 4 },
                minHeight: '100vh',
            }}
        >
            <RoleHeaderWithProgressBar progressValue={90} indexValue={4} />
            
            <Fade in={animate} timeout={800}>
                <Card 
                    elevation={4}
                    sx={{
                        width: '100%',
                        maxWidth: '768px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        background: 'linear-gradient(to bottom, #ffffff, #f9f7f3)',
                        mb: 4
                    }}
                >
                    <Box sx={{ p: 3, backgroundColor: '#977342', position: 'relative' }}>
                        <Typography 
                            variant="h5" 
                            sx={{ 
                                color: 'white', 
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <HelpOutlineIcon sx={{ mr: 1 }} />
                            Application Questions
                        </Typography>
                        
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: 'rgba(255, 255, 255, 0.8)', 
                                mt: 1 
                            }}
                        >
                            Create questions that applicants will need to answer when applying for this role
                        </Typography>
                        
                        <Box 
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                height: '100%',
                                width: '30%',
                                backgroundImage: 'linear-gradient(135deg, transparent 0%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 100%)',
                                backgroundSize: '20px 20px'
                            }}
                        />
                    </Box>
                    
                    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                        <FormSection />
                        
                        <Divider sx={{ my: 3 }} />
                        
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                p: 2,
                                backgroundColor: 'rgba(151, 115, 66, 0.08)',
                                borderRadius: '8px'
                            }}
                        >
                            <Typography variant="body2" sx={{ color: '#977342' }}>
                                {numQuestions > 0 
                                    ? `You have created ${numQuestions} question${numQuestions !== 1 ? 's' : ''}`
                                    : 'No questions created yet'}
                            </Typography>
                            
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: numQuestions > 0 ? '#4CAF50' : '#FFA000',
                                    fontWeight: 'medium'
                                }}
                            >
                                {numQuestions > 0 
                                    ? 'Ready to continue' 
                                    : 'Consider adding at least one question'}
                            </Typography>
                        </Box>
                    </Box>
                </Card>
            </Fade>
            
            <Fade in={animate} timeout={1000}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        maxWidth: '768px',
                        mt: 2
                    }}
                >
                    <Button
                        onClick={handleBack}
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            color: '#977342',
                            border: '1px solid #977342',
                            borderRadius: '8px',
                            padding: '10px 20px',
                            backgroundColor: 'white',
                            '&:hover': {
                                color: '#CEAB76',
                                border: '1px solid #CEAB76',
                                backgroundColor: 'rgba(206, 171, 118, 0.04)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                        aria-label="Go Back"
                    >
                        Previous
                    </Button>
                    
                    <Button
                        onClick={handleContinue}
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            backgroundColor: '#977342',
                            borderRadius: '8px',
                            padding: '10px 20px',
                            color: '#fff',
                            boxShadow: '0 4px 10px rgba(151, 115, 66, 0.3)',
                            '&:hover': {
                                backgroundColor: '#CEAB76',
                                boxShadow: '0 6px 15px rgba(151, 115, 66, 0.4)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                        aria-label="Next Step"
                    >
                        Continue
                    </Button>
                </Box>
            </Fade>
        </Box>
    );
};

export default Questions;