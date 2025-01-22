import * as React from 'react';
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { JobCardProps } from '@/types/Props/pages/JobCardProps';

export const JobCard: React.FC<JobCardProps> = ({
  imageUrl,
  isUrgent,
  title,
  description,
  location,
  deadline
}) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', width: '100%', boxShadow: 1, height: '100%' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={imageUrl}
          alt={`${title} job opportunity`}
          sx={{ height: 140, objectFit: 'cover' }}
        />
        {isUrgent && (
          <Box sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: '#977342',
            borderRadius: '16px',
            padding: '4px 12px',
            zIndex: 1
          }}>
            <Typography variant="body2" color="white">Urgent</Typography>
          </Box>
        )}
      </Box>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', flexGrow: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 1, color: '#666', flexGrow: 1 }}>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/10fe390d6517996c7791f7101a599145780bc043f11c60517128dbf2dddf78b6?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt="Location Icon"
            style={{ width: '20px', marginRight: '8px' }}
          />
          <Typography variant="body2" sx={{ color: '#999' }}>
            {location}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/810adb15bd3bbb2901cecd5a6aa224514fd809f4bf1994200a7d6fd26e1bddc4?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt="Deadline Icon"
            style={{ width: '20px', marginRight: '8px' }}
          />
          <Typography variant="body2" sx={{ color: '#999' }}>
            Deadline: {deadline}
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          sx={{ marginTop: 2, backgroundColor: '#977342', color: 'white' }} 
          aria-label={`Apply for ${title} position`}
        >
          Apply Now
        </Button>
      </CardContent>
    </Card>
  );
};