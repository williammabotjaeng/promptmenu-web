"use client";

import * as React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface SingleImageProps {
  image: string | null;
  onImageUpload: (newImage: string) => void;
  onDeleteImage: () => void;
}

const SingleImage: React.FC<SingleImageProps> = ({ image, onImageUpload, onDeleteImage }) => {
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const newImage = URL.createObjectURL(files[0]);
      onImageUpload(newImage);
    }
  };

  return (
    <>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          border: '1px dotted #977342', 
          padding: 1,
          position: 'relative',
          maxWidth: '400px',
          mx: 'auto',
        }}
      >
        {!image ? (
          <Box sx={{ position: 'relative' }}>
            <Box 
              component="img" 
              src={image} 
              alt="Uploaded image" 
              sx={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: '4px',
                objectFit: 'cover',
              }} 
            />
            <IconButton 
              onClick={onDeleteImage} 
              sx={{ 
                position: 'absolute', 
                top: 8, 
                right: 8, 
                bgcolor: 'white', 
                borderRadius: '50%', 
                boxShadow: 2,
              }}
            >
              <DeleteIcon sx={{ color: '#f00' }} />
            </IconButton>
          </Box>
        ) : (
          <label htmlFor="upload-button">
            <IconButton 
              component="span" 
              sx={{ 
                bgcolor: 'white', 
                borderRadius: '50%', 
                boxShadow: 2,
              }}
            >
              <AddIcon sx={{ color: '#977342' }} />
            </IconButton>
            <input 
              accept="image/*" 
              style={{ display: 'none' }} 
              id="upload-button" 
              type="file" 
              onChange={handleImageUpload} 
            />
          </label>
        )}
      </Box>
      {!image && (
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
          mt: 4,
          mb: 4
        }}>
          <Typography variant='h5'>You have no Poster</Typography>
          <br />
          <Typography variant="body1">Try uploading an Event Poster.</Typography>
          <br />
        </Box>
      )}
    </>
  );
};

export default SingleImage;