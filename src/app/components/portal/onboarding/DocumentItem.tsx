"use client";

import * as React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { DocumentItemProps } from '@/types/Props/DocumentItemProps';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DefaultIcon from '@mui/icons-material/InsertDriveFile'; 

export const DocumentItem: React.FC<DocumentItemProps> = ({ title, date }) => {
  const getIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <PictureAsPdfIcon />;
      case 'doc':
      case 'docx':
        return <DescriptionIcon />;
      case 'video':
        return <VideoLibraryIcon />;
      default:
        return <DefaultIcon />;
    }
  };

  const fileType = title.includes('.pdf') ? 'pdf' :
                   title.includes('.doc') || title.includes('.docx') ? 'doc' :
                   title.includes('video') ? 'video' : 'default';

  return (
    <Paper 
      elevation={1} 
      sx={{ display: 'flex', alignItems: 'center', padding: 2, backgroundColor: '#F9FAFB', borderRadius: '8px', marginBottom: 2 }}
    >
      <Box sx={{ marginRight: 2 }}>
        {getIcon(fileType)}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1" sx={{ fontWeight: 'medium', color: 'black' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 1, color: 'gray' }}>
          {date}
        </Typography>
      </Box>
    </Paper>
  );
};