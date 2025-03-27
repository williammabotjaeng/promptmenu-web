"use client";

import * as React from 'react';
import { useState } from 'react';
import { Box, IconButton, Typography, Button, Paper, Fade, Skeleton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VideocamIcon from '@mui/icons-material/Videocam';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MovieIcon from '@mui/icons-material/Movie';
import { styled } from '@mui/material/styles';

// Styled component for the file input
const Input = styled('input')({
  display: 'none',
});

interface SingleVideoProps {
  video: string | null;
  onVideoUpload: (newVideo: string) => void;
  onDeleteVideo: () => void;
}

const SingleVideo: React.FC<SingleVideoProps> = ({ video, onVideoUpload, onDeleteVideo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setIsLoading(true);
      const newVideo = URL.createObjectURL(files[0]);
      onVideoUpload(newVideo);
    }
  };
  
  const handleVideoLoad = () => {
    setTimeout(() => setIsLoading(false), 500);
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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        setIsLoading(true);
        const newVideo = URL.createObjectURL(file);
        onVideoUpload(newVideo);
      }
    }
  };

  // Generate a unique ID to avoid conflicts if multiple instances exist
  const uploadId = React.useId();

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: video ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: isDragging 
            ? '2px dashed #977342' 
            : video 
              ? '1px solid rgba(0,0,0,0.08)' 
              : '2px dashed rgba(151, 115, 66, 0.3)',
          borderRadius: '12px',
          padding: 2,
          position: 'relative',
          height: 'auto',
          backgroundColor: isDragging 
            ? 'rgba(151, 115, 66, 0.05)' 
            : video 
              ? 'white' 
              : 'rgba(250, 250, 250, 0.5)',
          transition: 'all 0.3s ease',
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isLoading && (
          <Skeleton 
            variant="rectangular" 
            width="100%" 
            height={240} 
            animation="wave"
            sx={{ 
              borderRadius: '8px',
              bgcolor: 'rgba(151, 115, 66, 0.1)'
            }}
          />
        )}
        
        {video ? (
          <Fade in={!isLoading} timeout={400}>
            <Box sx={{ position: 'relative', width: '100%' }}>
              <video
                controls
                src={video}
                onLoadedData={handleVideoLoad}
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
              />
              <IconButton
                onClick={onDeleteVideo}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '50%',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 1)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease',
                }}
                size="small"
              >
                <DeleteIcon sx={{ color: '#d32f2f', fontSize: '18px' }} />
              </IconButton>
            </Box>
          </Fade>
        ) : (
          <Fade in={!isLoading} timeout={400}>
            <Box 
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
              }}
            >
              <MovieIcon 
                sx={{ 
                  color: 'rgba(151, 115, 66, 0.3)', 
                  fontSize: 48,
                  mb: 2
                }}
              />
              
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#777',
                  mb: 3,
                  textAlign: 'center'
                }}
              >
                Upload a promotional video to showcase your event
              </Typography>
              
              <label htmlFor={uploadId}>
                <Input
                  accept="video/*"
                  id={uploadId}
                  type="file"
                  onChange={handleVideoUpload}
                />
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<VideocamIcon />}
                  sx={{
                    backgroundColor: '#977342',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#CEAB76',
                    },
                    padding: '10px 20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(151, 115, 66, 0.2)',
                  }}
                >
                  Upload Video
                </Button>
              </label>
              
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#999',
                  mt: 2
                }}
              >
                Or drag and drop video file here
              </Typography>
            </Box>
          </Fade>
        )}
      </Box>
    </Paper>
  );
};

export default SingleVideo;