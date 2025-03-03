import * as React from "react";
import { Box, Typography, TextField } from "@mui/material";
import SkillSelector from "./SkillSelector";
import useEventStore from "@/state/use-event-store";
import { useStore } from "zustand";
import { useState } from "react";

const RoleRequirement: React.FC = () => {

  const { eventRole, setEventRole } = useStore(useEventStore);

  const [openings, setOpenings] = useState(eventRole?.openings || 0);

  const [location, setLocation] = useState(eventRole?.location || "");

  const handleOpeningsChange = (event: any) => {
    setOpenings(event?.target?.value);
    setEventRole({
      ...eventRole,
      openings: event?.target?.value
    });
  }

  const handleLocation = (event: any) => {
    setLocation(event?.target?.value);
    setEventRole({
      ...eventRole,
      location: event?.target?.value
    });
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: { xs: 2, md: 4 }, 
          mt: 3,
          maxWidth: "768px",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
          px: { xs: 2, md: 5 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            pb: 2,
            fontWeight: "bold",
            color: "#977342",
            fontSize: { xs: "1.5rem", md: "2rem" }, 
          }}
        >
          Role Requirements
        </Typography>

        <Box sx={{ flexDirection: "column", width: "100%" }}>
          <Box sx={{ flexDirection: "column", width: "100%" }}>
            <Typography
              variant="subtitle2"
              sx={{
                pt: 1,
                pb: 1,
                color: "black",
                fontWeight: "bold",
              }}
            >
              Role Skill
            </Typography>
            <SkillSelector />
          </Box>
          <Box sx={{ flexDirection: "column", mt: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{
                py: 1,
                color: "black",
                fontWeight: "bold",
              }}
            >
              Number of People Needed
            </Typography>
            <TextField
              type="number"
              id="people_needed"
              variant="outlined"
              value={openings}
              onChange={handleOpeningsChange}
              sx={{
                mt: 1,
                width: "100%",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              aria-label="Number of People Needed"
            />
          </Box>
          <Box sx={{ flexDirection: "column", mt: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{
                py: 1,
                color: "black",
                fontWeight: "bold",
              }}
            >
              Location (City/Town)
            </Typography>
            <TextField
              type="text"
              id="location"
              variant="outlined"
              value={location}
              onChange={handleLocation}
              sx={{
                mt: 1,
                width: "100%",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              aria-label="Location (City/Town)"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RoleRequirement;
