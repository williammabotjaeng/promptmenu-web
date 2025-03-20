"use client";

import * as React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface SingleVideoProps {
  video: string | null;
  onVideoUpload: (newVideo: string) => void;
  onDeleteVideo: () => void;
}

const SingleVideo: React.FC<SingleVideoProps> = ({ video, onVideoUpload, onDeleteVideo }) => {
  
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const newVideo = URL.createObjectURL(files[0]);
      onVideoUpload(newVideo);
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
        {video ? (
          <Box sx={{ position: 'relative' }}>
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
              accept="video/*" 
              style={{ display: 'none' }} 
              id="upload-button" 
              type="file" 
              onChange={handleVideoUpload} 
            />
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
          mt: 4,
          mb: 4
        }}>
          <Typography variant='h5'>You have no Video</Typography>
          <br />
          <Typography variant="body1">Try uploading an event video.</Typography>
          <br />
        </Box>
      )}
    </>
  );
};

export default SingleVideo;