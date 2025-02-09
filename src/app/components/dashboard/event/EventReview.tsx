import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import { EventDetailItem } from "@/components/dashboard/event/EventDetailItem";
import HeaderWithProgressBar from "@/components/dashboard/event/HeaderWithProgressBar";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import { useStore } from "zustand";
import useEventStore from "@/state/use-event-store";

export const EventReview: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep }) => {

    const { eventMedia, eventDetails } = useStore(useEventStore);

    const handleContinue = () => {
        setActiveStep(activeStep + 1);
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    }

    React.useEffect(() => {
        console.log("Event Media:", eventMedia);
        console.log("Event Details:", eventDetails);
    }, []);
    
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                backgroundColor: '#fff',
                paddingBottom: '40px'
            }}
        >
            <HeaderWithProgressBar progressValue={100} />
            {/* Heading placed above the form */}
            <Typography
                variant="h4"
                sx={{
                    mt: 4,
                    mb: 2,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'black'
                }}
            >
                Event Review
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    pb: { xs: 3, md: 4 } 
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        px: { xs: 2, md: 4 },
                        py: 2,
                        mb: 0,
                        width: '100%'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                            width: '100%',
                            maxWidth: '1134px'
                        }}
                    >
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Box sx={{ flex: 1 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            grow: 1,
                                            pb: 2,
                                            width: '100%'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                p: 4,
                                                mt: 4,
                                                backgroundColor: 'white',
                                                borderRadius: '8px',
                                                boxShadow: '0px 8px 10px rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', gap: 2 }}>
                                                <Box sx={{ flex: 1 }}>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            pb: 2
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                color: '#977342',
                                                                fontWeight: 'bold'
                                                            }}
                                                        >
                                                            Event Details
                                                        </Typography>
                                                        <Box sx={{ mt: 2 }}>
                                                            <EventDetailItem
                                                                label="Event Title"
                                                                value="Dubai Fashion Week 2025"
                                                            />
                                                            <EventDetailItem
                                                                label="Description"
                                                                value="Luxury fashion event showcasing international designers"
                                                            />
                                                            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                                                <EventDetailItem
                                                                    label="Start Date"
                                                                    value="March 15, 2025"
                                                                />
                                                                <EventDetailItem
                                                                    label="End Date"
                                                                    value="March 20, 2025"
                                                                />
                                                            </Box>
                                                            <EventDetailItem
                                                                label="Assistance Provided"
                                                                value="Meals, Transportation, Accommodation"
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            py: 1,
                                                            textAlign: 'left'
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                color: '#977342',
                                                                fontWeight: 'bold'
                                                            }}
                                                        >
                                                            Uploaded Media
                                                        </Typography>
                                                        <Box
                                                            component="img"
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/e07a0c65ece06411e8df11d9f665193106ac52493d3cbe206845d01d043743f9?apiKey=7fae980a988640eea8add1e49a5d542e&"
                                                            alt="Event preview"
                                                            sx={{
                                                                objectFit: 'contain',
                                                                mt: 2,
                                                                width: '100%',
                                                                aspectRatio: '1.52'
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    mt: 4,
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        px: 4,
                                                        py: 2,
                                                        mr: 4,
                                                        color: '#977342',
                                                        backgroundColor: '#fff',
                                                        '&:hover': {
                                                            backgroundColor: '#fff',
                                                            color: '#CEAB76'
                                                        }
                                                    }}
                                                    onClick={handleBack}
                                                >
                                                    Go Back
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        px: 4,
                                                        py: 2,
                                                        backgroundColor: '#977342',
                                                        color: 'white',
                                                        '&:hover': {
                                                            backgroundColor: '#CEAB76'
                                                        }
                                                    }}
                                                    onClick={handleContinue}
                                                >
                                                    Submit Event
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};