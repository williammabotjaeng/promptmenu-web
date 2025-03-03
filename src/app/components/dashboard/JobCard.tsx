"use client";

import * as React from "react";
import { Box, Button, Typography, Chip, Paper, Stack } from "@mui/material";
import { PortalJobCardProps } from "@/types/Props/PortalJobCardProps";

export const JobCard: React.FC<PortalJobCardProps> = ({
  title,
  location,
  hourlyPay,
  dailyPay,
  projectPay,
  genders,
  ethnicities,
  skill,
  openings,
  hardDeadline,
  minAge,
  maxAge
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        backgroundColor: "white",
        borderRadius: "8px",
        marginBottom: 2,
      }}
    >
      <Box display="flex" flexDirection="column">
        {/* Title and Location */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Typography
              variant="h6"
              sx={{
                color: "black",
                fontWeight: "bold",
                fontSize: { xs: "1.2rem", md: "1.5rem" },
              }}
            >
              {title} at {location}
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              marginTop: { xs: 2, md: 0 },
              width: { xs: "100%", md: "auto" },
            }}
          >
            Apply Now
          </Button>
        </Box>

        {/* Pay Details */}
        <Box mt={2}>
          <Typography variant="body2" sx={{ color: "#4B5563" }}>
            <strong>Pay:</strong> {hourlyPay ? `$${hourlyPay}/hour` : ""}
            {dailyPay ? ` | $${dailyPay}/day` : ""}
            {projectPay ? ` | $${projectPay}/project` : ""}
          </Typography>
        </Box>

        {/* Preferred Genders and Ethnicities */}
        <Box mt={2}>
          <Typography variant="body2" sx={{ color: "#4B5563" }}>
            <strong>Preferred Genders:</strong> {genders?.join(", ") || "Any"}
          </Typography>
          <Typography variant="body2" sx={{ color: "#4B5563", mt: 1 }}>
            <strong>Preferred Ethnicities:</strong>{" "}
            {ethnicities?.join(", ") || "Any"}
          </Typography>
        </Box>

        {/* Skills and Openings */}
        <Box mt={2}>
          <Typography variant="body2" sx={{ color: "#4B5563" }}>
            <strong>Skills:</strong> {skill || "Not specified"}
          </Typography>
          <Typography variant="body2" sx={{ color: "#4B5563", mt: 1 }}>
            <strong>Openings:</strong> {openings || "Not specified"}
          </Typography>
          <Typography variant="body2" sx={{ color: "#4B5563", mt: 1 }}>
            <strong>Age Range:</strong> {`${minAge} - ${maxAge}` || "Not specified"}
          </Typography>
        </Box>

        {/* Hard Deadline */}
        <Box mt={2}>
          <Typography variant="body2" sx={{ color: "#4B5563" }}>
            <strong>Application Deadline:</strong>{" "}
            {hardDeadline || "Not specified"}
          </Typography>
        </Box>

        {/* Ethnicities as Chips */}
        <Box display="flex" gap={1} mt={2} flexWrap="wrap">
          {ethnicities?.map((ethnicity, index) => (
            <Chip
              key={index}
              label={ethnicity}
              sx={{
                backgroundColor: index === 0 ? "#CEAB76" : "#977342",
                color: "white",
                margin: "2px",
              }}
            />
          ))}
        </Box>
      </Box>
    </Paper>
  );
};