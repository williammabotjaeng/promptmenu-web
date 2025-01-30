"use client";

import * as React from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useStore } from 'zustand';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';

const PhotoGrid: React.FC = () => {

  const { talentData, setTalentData } = useStore(useTalentOnboardingStore); 

  const [images, setImages] = useState<string[]>(talentData?.additional_images || []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...newImages]);
    setTalentData({
      ...talentData,
      additional_images: newImages
    })
  };

  return (
    <Box 
      sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, 
        gap: 1, 
        border: '1px dotted #977342', 
        padding: 1,
        position: 'relative',
        maxWidth: '400px',
        mx: 'auto',
      }}
    >
      {images.map((image, index) => (
        <Box 
          key={index} 
          component="img" 
          src={image} 
          alt={`Uploaded image ${index + 1}`} 
          sx={{ 
            width: '100%', 
            height: 'auto', 
            borderRadius: '4px',
            objectFit: 'cover',
          }} 
        />
      ))}
      <input 
        accept="image/*" 
        style={{ display: 'none' }} 
        id="upload-button" 
        type="file" 
        multiple 
        onChange={handleImageUpload} 
      />
      <label htmlFor="upload-button">
        <IconButton 
          component="span" 
          sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            bgcolor: 'white', 
            borderRadius: '50%', 
            boxShadow: 2,
          }}
        >
          <AddIcon sx={{ color: '#977342' }} />
        </IconButton>
      </label>
    </Box>
  );
};

export default PhotoGrid;