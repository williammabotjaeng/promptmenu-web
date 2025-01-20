"use client";

import * as React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons'; 
import InstagramIcon from '@mui/icons-material/Instagram';
import WebIcon from '@mui/icons-material/Web'; 

import { SocialInputProps } from '@/types/Props/SocialInputProps';

export const SocialInput: React.FC<SocialInputProps> = ({ icon, placeholder, alt }) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'instagram':
        return <InstagramIcon sx={{ fontSize: '18px', color: '#977342' }} />;
      case 'tiktok':
        return <FontAwesomeIcon icon={faTiktok} style={{ fontSize: '18px', color: '#977342' }} />;
      case 'website':
        return <WebIcon sx={{ fontSize: '18px', color: '#977342' }} />;
      default:
        return null;
    }
  };

  return (
    <TextField
      fullWidth
      placeholder={placeholder}
      aria-label={placeholder}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {renderIcon(icon)}
          </InputAdornment>
        ),
      }}
      sx={{
        bgcolor: 'black',
        borderRadius: '8px',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#977342',
            color: '#CEAB76'
          },
          '&:hover fieldset': {
            borderColor: '#977342',
            color: '#CEAB76'
          },
          '&.Mui-focused fieldset': {
            borderColor: '#977342',
            color: '#CEAB76'
          },
        },
        '& .MuiInputBase-input': {
          color: '#CEAB76'
        },
      }}
    />
  );
};