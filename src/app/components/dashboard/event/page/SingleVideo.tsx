"use client";

import * as React from 'react';
import { Box, IconButton, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VideocamIcon from '@mui/icons-material/Videocam';
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
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      const newVideo = URL.createObjectURL(files[0]);
      onVideoUpload(newVideo);
    }
  };

  // Generate a unique ID to avoid conflicts if multiple instances exist
  const uploadId = React.useId();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px dotted #977342',
          borderRadius: '8px',
          padding: 2,
          position: 'relative',
          maxWidth: '400px',
          height: video ? 'auto' : '200px',
          mx: 'auto',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: '#7D5F35',
            backgroundColor: 'rgba(151, 115, 66, 0.04)',
          },
        }}
      >
        {video ? (
          <Box sx={{ position: 'relative', width: '100%' }}>
            <video
              controls
              src={video}
              style={{
                width: '100%',
                borderRadius: '4px',
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
                boxShadow: 2,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 1)',
                },
              }}
              size="small"
            >
              <DeleteIcon sx={{ color: '#f44336' }} />
            </IconButton>
          </Box>
        ) : (
          <label htmlFor={uploadId}>
            <Input
              accept="video/*"
              id={uploadId}
              type="file"
              onChange={handleVideoUpload}
            />
            <Button
              variant="outlined"
              component="span"
              startIcon={<VideocamIcon />}
              sx={{
                color: '#977342',
                borderColor: '#977342',
                '&:hover': {
                  borderColor: '#7D5F35',
                  backgroundColor: 'rgba(151, 115, 66, 0.04)',
                },
                padding: '10px 20px',
              }}
            >
              Upload Video
            </Button>
          </label>
        )}
      </Box>
      {!video && (
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
          mt: 2,
          mb: 2
        }}>
          <Typography variant="body2" color="text.secondary">
            You have not uploaded a video yet.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default SingleVideo;