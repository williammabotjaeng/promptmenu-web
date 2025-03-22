import * as React from "react";
import { useState, useEffect } from "react";
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  Divider, 
  Fade, 
  Card, 
  CardContent,
  Container,
  Chip
} from "@mui/material";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import { useStore } from "zustand";
import { useRouter } from "next/navigation";
import useEventStore from "@/state/use-event-store";
import { useEvent } from "@/providers/event-provider";
import { useCompany } from "@/providers/company-provider";
import { useCookies } from "react-cookie";
import SaveIcon from "@mui/icons-material/Save";
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { uploadFileToS3 } from "@/services/s3UploadUtils";
import RolesOverview from "./RolesOverview";

interface EventRolesProps {
  event: any;
}

const EventRoles: React.FC<EventRolesProps> = ({ event }) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const { eventDetails, eventMedia } = useStore(useEventStore);
  const [cookies] = useCookies([
    'event_id', 'username', 
    'access', 'event_video',
    'event_photos','event_poster',
    'company_id'
  ]);
  
  const router = useRouter();
  
  const eventID = cookies['event_id'];
  const userName = cookies['username'];
  const accessToken = cookies['access'];
  const companyID = cookies['company_id'];
  
  const { updateEvent } = useEvent();
  const { updateCompany, company, fetchCompany } = useCompany();
  
  useEffect(() => {
    setFadeIn(true);
    
    // Reset saved state after showing success message
    if (saved) {
      const timer = setTimeout(() => {
        setSaved(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [saved]);
  
  const handleSave = () => {
    // Implement your save logic here
    setSaved(true);
  };
  
  return (
    <Fade in={fadeIn} timeout={800}>
      <Container maxWidth="lg" sx={{ my: 2 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: "12px",
            backgroundColor: "#977342",
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box sx={{ position: "relative", zIndex: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center' }}>
              <GroupWorkIcon sx={{ mr: 1.5 }} />
              Event Roles Management
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: "80%", opacity: 0.9 }}>
              Review and manage all roles associated with this event. Roles define the positions you need to fill and help attract the right talent.
            </Typography>
          </Box>
          
          {/* Decorative background elements */}
          <Box
            sx={{
              position: "absolute",
              right: { xs: -100, md: -30 },
              top: { xs: -50, md: -30 },
              opacity: 0.1,
              zIndex: 1,
            }}
          >
            <svg width="200" height="200" viewBox="0 0 24 24">
              <path
                fill="white"
                d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"
              />
            </svg>
          </Box>
        </Paper>
            
        <Card
          elevation={0}
          sx={{
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            mb: 4,
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "#f5f7fa",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Event Roles
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event?.roles?.length > 0 
                  ? `This event has ${event.roles.length} role${event.roles.length !== 1 ? 's' : ''} defined`
                  : "No roles have been defined for this event yet"}
              </Typography>
            </Box>
            
            {/* Roles Overview Component */}
            <Box sx={{ p: 3 }}>
              <RolesOverview event={event} />
            </Box>
          </CardContent>
        </Card>
        
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box>
            {saved && (
              <Fade in={saved}>
                <Chip
                  icon={<CheckCircleIcon />}
                  label="Changes saved successfully"
                  color="success"
                  variant="outlined"
                  sx={{ mr: 2 }}
                />
              </Fade>
            )}
          </Box>
          
          <Button
            onClick={handleSave}
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              backgroundColor: '#977342',
              color: 'white',
              py: 1.5,
              px: 3,
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(151, 115, 66, 0.2)',
              '&:hover': {
                backgroundColor: '#CEAB76',
                boxShadow: '0 6px 16px rgba(151, 115, 66, 0.3)',
              },
              transition: 'all 0.2s ease'
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Container>
    </Fade>
  );
};

export default EventRoles;