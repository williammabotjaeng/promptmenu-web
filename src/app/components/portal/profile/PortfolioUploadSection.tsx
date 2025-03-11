"use client";

import * as React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { PortfolioUploadSectionProps } from '@/types/Props/PortfolioUploadSectionProps';

export const PortfolioUploadSection: React.FC<PortfolioUploadSectionProps> = ({
  title,
  description,
  buttonText,
  handleFileUpload,
  handleFileDelete,
  portfolioFile 
}) => {
  const renderIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'videos':
        return <VideoLibraryIcon sx={{ fontSize: '36px', color: '#977342' }} />;
      case 'resume/cv':
        return <DescriptionIcon sx={{ fontSize: '36px', color: '#977342' }} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        py: 0.5,
        mt: 2,
        maxWidth: '100%',
        border: '1px dotted #977342',
        padding: '10px',
        borderRadius: '12px',
      }}
    >
      <Typography variant="h6" sx={{ color: '#977342' }}>
        {title}
      </Typography>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          px: 4,
          py: 5,
          mt: 2,
          border: '2px dashed',
          borderColor: 'stone.500',
          bgcolor: 'transparent',
          borderRadius: '8px',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '36px', minHeight: '36px' }}>
            {renderIcon(title)}
          </Box>
          <Typography variant="body1" sx={{ textAlign: 'center', color: '#977342', mt: 1 }}>
            {description}
          </Typography>

          {/* If a file is uploaded, display its type, name, and a preview */}
          {portfolioFile.file ? (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#977342', mb: 1 }}>
                Uploaded {portfolioFile.type === 'video' ? 'Video' : 'Resume'}: {portfolioFile.fileName}
              </Typography>
              {portfolioFile.type === 'video' ? (
                <video
                  src={String(portfolioFile.file)}
                  controls
                  style={{ width: '100%', maxWidth: '300px', borderRadius: '8px' }}
                />
              ) : (
                <a
                  href={String(portfolioFile.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    backgroundColor: '#CEAB76',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px',
                  }}
                >
                  View Resume
                </a>
              )}
              <Button
                variant="outlined"
                color="error"
                onClick={handleFileDelete}
                sx={{ mt: 2 }}
              >
                Delete
              </Button>
            </Box>
          ) : (
            // If no file is uploaded, show the upload button
            <Button
              variant="contained"
              component="label"
              sx={{ mt: 2, bgcolor: '#CEAB76', color: 'white', '&:hover': { bgcolor: '#977342' } }}
            >
              {buttonText}
              <input
                type="file"
                hidden
                accept={title.toLowerCase().includes('videos') ? 'video/*' : '.pdf,.doc,.docx'}
                onChange={handleFileUpload}
              />
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};