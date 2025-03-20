import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import { RoleCard } from "@/components/dashboard/event/page/RoleCard";
import useEventStore from "@/state/use-event-store";
import { useStore } from "zustand";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useState } from "react";
import useCurrentEventStore from "@/state/use-current-event-store";
import { useEvent } from "@/providers/event-provider";
import useLocalRolesStore from "@/state/use-local-roles-store";

interface RolesOverviewProps {
  event: any;
}

const RolesOverview: React.FC<RolesOverviewProps> = ({ event }) => {

  const [localRoles, setLocalRoles] = useState([]);

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

  const progressSteps = [
    { label: "Create Event", hasIcon: true },
    { label: "Create Role", hasIcon: true },
    { label: "Ready to Publish", hasIcon: false },
  ];

  const handleAddRole = () => {
      let eventID = cookies?.event_id;
      router.push(`/add-role/${eventID}`)
  }

  React.useEffect(() => {
    console.log("Current Event Store:", currentEvent);
    console.log("Event Prop:", event);
    getEventRoles(eventID).then((data: any) => {
      console.log("Roles Data:", data);
      setRoles(data);
      setLocalRoles(data);
    });
  }, [cookies, currentEvent, event]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        padding: 3,
        borderRadius: "8px",
        overflow: "hidden",
        width: "100%",
        height: "100%"
      }}
    >
      <Box sx={{ backgroundColor: 'white', paddingBottom: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#977342", textAlign: "left" }}
        >
          Event Roles Overview
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", marginTop: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#000" }}>
            Roles
          </Typography>
          <Button
            sx={{
              color: "#977342",
              "&:hover": {
                color: "white",
              },
            }}
            onClick={handleAddRole}
          >
            + Add Role
          </Button>
        </Box>
        {localRoles?.length > 0 ? localRoles?.map((role, index) => (
          <RoleCard
            key={index} 
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
        )) : <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}><Typography variant="body1">No Roles for this Event, Try adding a Role.</Typography></Box>}
      </Box>
    </Box>
  );
};

export default RolesOverview;
