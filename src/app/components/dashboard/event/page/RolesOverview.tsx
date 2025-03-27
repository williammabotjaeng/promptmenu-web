"use client";

import * as React from "react";
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  Divider, 
  Grid, 
  Fade, 
  Card, 
  Chip,
  CircularProgress,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { RoleCard } from "@/components/dashboard/event/page/RoleCard";
import useEventStore from "@/state/use-event-store";
import { useStore } from "zustand";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useState, useEffect } from "react";
import useCurrentEventStore from "@/state/use-current-event-store";
import { useEvent } from "@/providers/event-provider";
import useLocalRolesStore from "@/state/use-local-roles-store";
import FetchingRoles from "../../FetchingRoles";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import RefreshIcon from '@mui/icons-material/Refresh';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

interface RolesOverviewProps {
  event: any;
}

const RolesOverview: React.FC<RolesOverviewProps> = ({ event }) => {
  const [localRoles, setLocalRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { eventDetails } = useStore(useEventStore);
  const { currentEvent } = useStore(useCurrentEventStore);
  const { roles, setRoles } = useStore(useLocalRolesStore);
  const { getEventRoles } = useEvent();

  const [cookies] = useCookies([
    'current_event',
    'event_id'
  ]);

  const eventID = cookies?.event_id;
  const router = useRouter();

  const handleAddRole = () => {
    let eventID = cookies?.event_id;
    router.push(`/add-role/${eventID}`);
  };

  const handleRefreshRoles = () => {
    setLoading(true);
    getEventRoles(eventID).then((data: any) => {
      setRoles(data);
      setLocalRoles(data);
      setLoading(false);
    }).catch(err => {
      console.error("Error fetching roles:", err);
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    getEventRoles(eventID).then((data: any) => {
      setRoles(data);
      setLocalRoles(data);
      setTimeout(() => {
        setLoading(false);
        setFadeIn(true);
      }, 300);
    });
  }, [cookies, currentEvent, event]);

  if (loading) return <FetchingRoles />;

  return (
    <Fade in={fadeIn} timeout={800}>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 3,
          }}
        >
          <Box sx={{ mb: { xs: 2, sm: 0 } }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 600, 
                color: "#333",
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <GroupsIcon sx={{ mr: 1, color: "#977342" }} />
              Event Roles
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {localRoles?.length > 0 
                ? `Managing ${localRoles.length} role${localRoles.length !== 1 ? 's' : ''} for this event`
                : "No roles defined yet - add your first role below"}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Tooltip title="Refresh roles">
              <IconButton
                size="small"
                onClick={handleRefreshRoles}
                sx={{
                  color: "#777",
                  '&:hover': { color: "#977342" },
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={handleAddRole}
              sx={{
                backgroundColor: "#977342",
                color: "white",
                boxShadow: "0 2px 10px rgba(151, 115, 66, 0.2)",
                '&:hover': {
                  backgroundColor: "#CEAB76",
                },
                borderRadius: "8px",
                px: { xs: 2, sm: 3 },
                py: 1,
              }}
            >
              Add Role
            </Button>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 4 }} />
        
        {localRoles?.length > 0 ? (
          <Grid container spacing={3}>
            {localRoles.map((role, index) => (
              <Grid item xs={12} key={index}>
                <Fade in={true} timeout={300 + (index * 150)}>
                  <Box>
                    <RoleCard
                      id={role?.id}
                      title={role.title} 
                      status="Active" 
                      requirements={`${role.genders.join(", ")}, ${role.min_age}-${
                        role.max_age
                      } years`} 
                      location={eventDetails?.location} 
                      postedTime={moment(role?.created_at).fromNow()} 
                      salary={`AED ${role?.daily_pay || role?.hourly_pay || role?.project_pay}`} 
                    />
                  </Box>
                </Fade>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Card
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "12px",
              border: "1px dashed rgba(151, 115, 66, 0.3)",
              backgroundColor: "rgba(151, 115, 66, 0.02)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SentimentDissatisfiedIcon 
              sx={{ 
                fontSize: 60, 
                color: "rgba(151, 115, 66, 0.3)",
                mb: 2
              }} 
            />
            <Typography variant="h6" sx={{ mb: 1, color: "#555" }}>
              No Roles Available
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: "500px" }}>
              You haven't created any roles for this event yet. Roles help define the positions you need to fill and attract the right talent.
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={handleAddRole}
              sx={{
                backgroundColor: "#977342",
                color: "white",
                '&:hover': {
                  backgroundColor: "#CEAB76",
                },
                borderRadius: "8px",
                px: 3,
                py: 1.5,
              }}
            >
              Create Your First Role
            </Button>
          </Card>
        )}
      </Box>
    </Fade>
  );
};

export default RolesOverview;