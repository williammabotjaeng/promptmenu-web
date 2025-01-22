import * as React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { EventUploadSectionProps } from '@/types/Props/EventUploadSectionProps';

export const EventUploadSection: React.FC<EventUploadSectionProps> = ({
  title,
  icon,
  buttonText,
  description
}) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        padding: { xs: 2, sm: 3 }, 
        borderRadius: 2, 
        backgroundColor: 'rgba(151, 115, 66, 0.1)', 
        width: { xs: '100%', sm: '80%', md: '60%' }, 
        margin: '0 auto', 
      }}
    >
      <Typography 
        variant="h5" 
        sx={{ 
          paddingBottom: 1, 
          color: '#977342', 
          textAlign: 'center', 
        }}
      >
        {title}
      </Typography>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: 3, 
          marginTop: 2, 
          border: '2px dashed', 
          borderColor: 'rgba(151, 115, 66, 0.5)', 
          borderRadius: 2,
          backgroundColor: 'transparent',
          width: '100%', 
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '100%', 
            maxWidth: '173px', 
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              width: '40px', 
              minHeight: '36px' 
            }}
          >
            <img 
              loading="lazy" 
              src={icon} 
              alt="" 
              style={{ 
                objectFit: 'contain', 
                width: '100%', 
                height: 'auto' 
              }} 
            />
          </Box>
          <Typography 
            variant="body1" 
            sx={{ 
              textAlign: 'center', 
              color: '#CEAB76',
              marginTop: 1, 
            }}
          >
            {description}
          </Typography>
          <Button 
            variant="contained" 
            sx={{ 
              marginTop: 2, 
              backgroundColor: '#977342', 
              color: 'white',
              '&:hover': {
                backgroundColor: '#CEAB76', 
              },
              width: '100%', 
            }}
          >
            {buttonText}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};