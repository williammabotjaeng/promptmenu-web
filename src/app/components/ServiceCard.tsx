import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { ServiceCardProps } from '@/types/Props/ServiceCardProps';

export const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <Card 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        padding: 2, 
        borderRadius: 2, 
        border: '1px solid rgba(99, 115, 129, 0.2)', 
        backgroundColor: 'transparent', 
        maxWidth: 300, 
        margin: { xs: '10px 0', md: '0' } 
      }}
    >
      <CardMedia
        component="img"
        loading="lazy"
        src={icon}
        alt={title}
        sx={{ 
          objectFit: 'contain', 
          width: 36, 
          height: 36, 
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', 
          borderRadius: 1,
          marginBottom: 1 // Space between icon and title
        }}
      />
      <CardContent sx={{ padding: 0 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 1, color: 'white' }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};