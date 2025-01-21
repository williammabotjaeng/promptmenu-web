import * as React from "react";
import { Box, Typography } from "@mui/material";
import { EventDetailsSectionProps } from "@/types/Props/EventDetailsSectionProps";

export const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({
  title,
  description,
  startDate,
  endDate,
  assistance
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        width: '100%',
        backgroundColor: 'transparent',
        mt: { xs: 2, md: 4 },
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#977342' }}>
        Event Details
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: '#000' }}>
            Event Title
          </Typography>
          <Typography variant="body1" sx={{ color: '#977342', mt: 1 }}>
            {title}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: '#000' }}>
            Description
          </Typography>
          <Typography variant="body1" sx={{ color: '#977342', mt: 1 }}>
            {description}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: '#000' }}>
              Start Date
            </Typography>
            <Typography variant="body1" sx={{ color: '#977342', mt: 1 }}>
              {startDate}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: '#000' }}>
              End Date
            </Typography>
            <Typography variant="body1" sx={{ color: '#977342', mt: 1 }}>
              {endDate}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: '#000' }}>
            Assistance Provided
          </Typography>
          <Typography variant="body1" sx={{ color: '#977342', mt: 1 }}>
            {assistance}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default EventDetailsSection;