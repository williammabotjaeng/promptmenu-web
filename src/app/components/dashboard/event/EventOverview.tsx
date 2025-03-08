import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import { EventDetails } from "./EventDetails";
import { RoleCard } from "./RoleCard";
import EventDetailsSection from "./EventDetailsSection";
import useEventStore from "@/state/use-event-store";
import { useStore } from "zustand";
import MediaGrid from "./MediaGrid";
import moment from "moment";

interface EventOverviewProps {
  activeStep: number;
  setActiveStep: (step: number) => void; 
}

const EventOverview: React.FC<EventOverviewProps> = ({
  activeStep,
  setActiveStep
}) => {
  const { eventDetails } = useStore(useEventStore);

  const progressSteps = [
    { label: "Create Event", hasIcon: true },
    { label: "Create Role", hasIcon: true },
    { label: "Ready to Publish", hasIcon: false },
  ];

  const handleAddRole = () => {
    setActiveStep(activeStep - 6);
  }

  React.useEffect(() => {
    console.log("Event Details:", eventDetails);
  }, [eventDetails]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        padding: 3,
        borderRadius: "8px",
        overflow: "hidden",
        width: "80%",
      }}
    >
      <Box sx={{ paddingBottom: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#977342", textAlign: "left" }}
        >
          Event Overview
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <EventDetailsSection
          title={eventDetails?.eventTitle}
          description={eventDetails?.description}
          startDate={eventDetails?.startDateTime}
          endDate={eventDetails?.endDateTime}
          assistance={`${
            eventDetails?.accommodationProvided ? "Accomodation " : ""
          }${eventDetails?.transportProvided ? " Transport " : ""}${
            eventDetails?.mealsProvided ? " Meals " : ""
          }`}
        />
        {/* <Box sx={{ marginTop: 2 }}>
          <MediaGrid />
        </Box> */}
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
            id={role?.id}
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

export default EventOverview;
