import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import { RoleCard } from "@/components/dashboard/event/RoleCard";
import useEventStore from "@/state/use-event-store";
import { useStore } from "zustand";
import moment from "moment";

const RolesOverview: React.FC = () => {
  const { eventDetails } = useStore(useEventStore);

  const progressSteps = [
    { label: "Create Event", hasIcon: true },
    { label: "Create Role", hasIcon: true },
    { label: "Ready to Publish", hasIcon: false },
  ];

  const handleAddRole = () => {

  }

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
        {eventDetails?.roles?.map((role, index) => (
          <RoleCard
            key={index} 
            title={role.title} 
            status="Active" 
            requirements={`${role.genders.join(", ")}, ${role.minAge}-${
              role.maxAge
            } years`} 
            location={eventDetails.location} 
            postedTime={moment(role?.created_at).fromNow()} 
            salary={`AED ${role.dailyPay || role.hourlyPay || role.projectPay}`} 
          />
        ))}
      </Box>
    </Box>
  );
};

export default RolesOverview;
