"use client";

import * as React from 'react';
import { useState } from 'react';
import { Box, IconButton, Typography, Paper, Fade, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import CollectionsIcon from '@mui/icons-material/Collections';

interface PhotoGridProps {
  images: string[];
  onImageUpload: (newImages: string[]) => void;
  onDeleteImage: (image: string) => void;
  imagesToDelete: string[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ images, onImageUpload, onDeleteImage, imagesToDelete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    
    setIsUploading(true);
    const files = Array.from(event.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    onImageUpload(newImages);
    
    // Simulate brief loading state for better UX
    setTimeout(() => setIsUploading(false), 600);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (!e.dataTransfer.files?.length) return;
    
    setIsUploading(true);
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    const newImages = files.map(file => URL.createObjectURL(file));
    onImageUpload(newImages);
    
    setTimeout(() => setIsUploading(false), 600);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        border: isDragging 
          ? '2px dashed #977342' 
          : '1px solid rgba(0,0,0,0.09)',
        bgcolor: isDragging ? 'rgba(151, 115, 66, 0.05)' : 'white',
        position: 'relative',
        maxWidth: '100%',
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Upload overlay/indicator */}
      {isUploading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(2px)',
          }}
        >
          <CircularProgress size={40} sx={{ color: '#977342', mb: 2 }} />
          <Typography variant="body2" color="textSecondary">
            Uploading images...
          </Typography>
        </Box>
      )}

      {images.length > 0 ? (
        <Box sx={{ p: 2 }}>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { 
              xs: 'repeat(2, 1fr)', 
              sm: 'repeat(3, 1fr)', 
              md: 'repeat(4, 1fr)' 
            }, 
            gap: 2,
          }}>
            {images.map((image, index) => (
              <Fade in={true} key={index} timeout={300 + (index * 50)}>
                <Box sx={{ 
                  position: 'relative',
                  aspectRatio: '1',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
                  }
                }}>
                  <Box 
                    component="img" 
                    src={image} 
                    alt={`Uploaded image ${index + 1}`}
                    sx={{ 
                      width: '100%', 
                      height: '100%',
                      objectFit: 'cover',
                    }} 
                  />
                  <IconButton 
                    onClick={() => onDeleteImage(image)}
                    size="small"
                    sx={{ 
                      position: 'absolute', 
                      top: 6, 
                      right: 6, 
                      bgcolor: 'rgba(255,255,255,0.85)', 
                      width: 28,
                      height: 28,
                      backdropFilter: 'blur(4px)',
                      '&:hover': {
                        bgcolor: 'white',
                        transform: 'scale(1.1)',
                      }
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: 16, color: '#d32f2f' }} />
                  </IconButton>
                </Box>
              </Fade>
            ))}
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 3,
            position: 'relative',
          }}>
            <input 
              accept="image/*" 
              style={{ display: 'none' }} 
              id="upload-more-button" 
              type="file" 
              multiple 
              onChange={handleImageUpload} 
            />
            <label htmlFor="upload-more-button">
              <Box
                component="button"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: 'rgba(151, 115, 66, 0.08)',
                  color: '#977342',
                  border: '1px solid rgba(151, 115, 66, 0.2)',
                  borderRadius: '8px',
                  px: 2,
                  py: 1,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'rgba(151, 115, 66, 0.12)',
                    borderColor: 'rgba(151, 115, 66, 0.3)',
                  }
                }}
              >
                <AddIcon fontSize="small" />
                Add More Photos
              </Box>
            </label>
          </Box>
        </Box>
      ) : (
        <Box sx={{ p: 4 }}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            py: 4,
          }}>
            <CollectionsIcon sx={{ 
              fontSize: 64, 
              color: 'rgba(151, 115, 66, 0.3)',
              mb: 2
            }} />
            
            <Typography variant='h6' sx={{ 
              color: '#555', 
              fontWeight: 500,
              mb: 1
            }}>
              No Images Yet
            </Typography>
            
            <Typography variant="body2" sx={{ 
              color: '#777',
              maxWidth: '280px',
              mb: 3
            }}>
              Upload photos to showcase your event and attract more talent
            </Typography>
            
            <input 
              accept="image/*" 
              style={{ display: 'none' }} 
              id="upload-button" 
              type="file" 
              multiple 
              onChange={handleImageUpload} 
            />
            <label htmlFor="upload-button">
              <Box
                component="button"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: '#977342',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  px: 2.5,
                  py: 1.5,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  boxShadow: '0 2px 10px rgba(151, 115, 66, 0.3)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: '#CEAB76',
                    boxShadow: '0 4px 12px rgba(151, 115, 66, 0.4)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                <AddIcon />
                Upload Photos
              </Box>
            </label>
            
            <Typography variant="caption" sx={{ 
              color: '#999',
              mt: 2
            }}>
              Or drag and drop images here
            </Typography>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default PhotoGrid;