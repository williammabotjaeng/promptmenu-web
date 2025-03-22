import * as React from "react";
import { 
  Box, 
  Button, 
  Typography, 
  Card, 
  CardContent, 
  Fade, 
  Divider,
  Chip
} from "@mui/material";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import { DeadlineForm } from "@/components/dashboard/event/DeadlineForm";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DeadlineHeaderWithProgressBar from "./DeadlineHeaderWithProgressBar";
import { useStore } from "zustand";
import useEventStore from "@/state/use-event-store";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

const EventDeadline: React.FC<PostEventStepProps> = ({
  activeStep,
  setActiveStep,
}) => {
  const { eventRole, eventDetails, setEventDetails, clearEventRole } = useStore(useEventStore);
  const [cookies, removeCookie] = useCookies(['questions']);
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleContinue = () => {
    setEventDetails({
      ...eventDetails,
      roles: [...eventDetails.roles, eventRole],
    });
    clearEventRole();
    removeCookie("questions", { path: "/" });
    
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        justifyContent: "center",
        padding: { xs: 2, md: 4 },
        pb: { xs: 9, md: 4 },
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <DeadlineHeaderWithProgressBar progressValue={85} indexValue={2 * 2} />
      
      <Fade in={animate} timeout={800}>
        <Card
          elevation={3}
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            mb: 4,
            background: "linear-gradient(to bottom, #ffffff, #f9f7f3)",
            boxShadow: "0px 8px 20px rgba(151, 115, 66, 0.15)",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              boxShadow: "0px 12px 28px rgba(151, 115, 66, 0.2)",
              transform: "translateY(-4px)"
            }
          }}
        >
          <Box sx={{ 
            p: 3, 
            backgroundColor: "#977342", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden"
          }}>
            <Box sx={{ zIndex: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <CalendarTodayIcon sx={{ mr: 1.5 }} />
                Application Deadline
              </Typography>
              
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  mt: 0.5,
                  maxWidth: "80%"
                }}
              >
                Set when applications for this role will close
              </Typography>
            </Box>
            
            <Chip 
              label={`Step ${activeStep} of 8`} 
              size="small"
              sx={{ 
                bgcolor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontWeight: "medium",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                zIndex: 1
              }} 
            />
            
            {/* Decorative background elements */}
            <Box sx={{
              position: "absolute",
              top: "-30%",
              right: "-5%",
              width: "150px",
              height: "150px",
              borderRadius: "75px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              zIndex: 0
            }} />
            
            <Box sx={{
              position: "absolute",
              bottom: "-70%",
              right: "15%",
              width: "120px",
              height: "120px",
              borderRadius: "60px",
              backgroundColor: "rgba(255, 255, 255, 0.07)",
              zIndex: 0
            }} />
          </Box>
          
          <CardContent sx={{ p: 4 }}>
            <DeadlineForm />
            
            <Divider sx={{ my: 4, opacity: 0.6 }} />
            
            <Box sx={{ 
              p: 2.5, 
              backgroundColor: "rgba(151, 115, 66, 0.08)", 
              borderRadius: "12px",
              border: "1px dashed rgba(151, 115, 66, 0.3)"
            }}>
              <Typography variant="body2" sx={{ color: "#977342", fontStyle: "italic" }}>
                Setting clear deadlines helps candidates plan their applications and allows you to better manage the review process. Make sure to give candidates enough time to apply.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Fade>
      
      <Fade in={animate} timeout={1000}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: "space-between",
            mt: 2,
            width: "100%"
          }}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              px: 4,
              py: 1.5,
              color: "#977342",
              borderColor: "#977342",
              borderRadius: "8px",
              fontWeight: "medium",
              order: { xs: 2, md: 1 },
              mt: { xs: 2, md: 0 },
              "&:hover": {
                backgroundColor: "rgba(151, 115, 66, 0.04)",
                borderColor: "#CEAB76",
                color: "#CEAB76",
              },
              transition: "all 0.3s ease"
            }}
            onClick={handleBack}
          >
            Previous
          </Button>
          
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 4,
              py: 1.5,
              backgroundColor: "#977342",
              color: "white",
              borderRadius: "8px",
              fontWeight: "medium",
              order: { xs: 1, md: 2 },
              boxShadow: "0 4px 10px rgba(151, 115, 66, 0.3)",
              "&:hover": {
                backgroundColor: "#CEAB76",
                boxShadow: "0 6px 15px rgba(151, 115, 66, 0.4)"
              },
              transition: "all 0.3s ease"
            }}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </Box>
      </Fade>
    </Box>
  );
};

export default EventDeadline;