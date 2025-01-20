import * as React from 'react';
import { Box, Typography, Button, Input } from '@mui/material';
import { FileUploadProps } from '@/types/Props/FileUploadProps';

export const FileUpload: React.FC<FileUploadProps> = ({ title, supportedFormats, maxSize, onFileSelect }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <Box className="flex flex-col p-8 w-full rounded-xl bg-neutral-900 max-md:px-5 max-md:max-w-full">
      <Typography variant="h5" sx={{ pt: 1, pb: 2.5, color: 'white' }}>
        {title}
      </Typography>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          px: 5, 
          py: 9, 
          mt: 6, 
          borderColor: '#4B5563', 
          border: '2px dashed #977342',
          borderRadius: '8px', 
          backgroundColor: 'transparent' 
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '36px', width: '45px' }}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/45aa25c054a1c461816c866cb10428c1215716f71de16e44c06b8804a692696c?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt="Upload icon"
            style={{ objectFit: 'contain', width: '45px' }}
          />
        </Box>
        <Typography variant="body1" sx={{ color: 'white', textAlign: 'center' }}>
          Drag and drop your headshot here or
        </Typography>
        <label htmlFor="fileInput">
          <Button 
            variant="contained" 
            sx={{ 
              mt: 2, 
              backgroundColor: 'orange', 
              color: 'black', 
              '&:hover': { backgroundColor: '#FFA500' } 
            }}
          >
            Choose File
          </Button>
        </label>
        <Input
          type="file"
          id="fileInput"
          sx={{ display: 'none' }} 
          onChange={handleFileChange}
          inputProps={{ accept: supportedFormats }}
        />
        <Typography variant="caption" sx={{ mt: 2, color: 'gray' }}>
          {`Supported formats: ${supportedFormats} (Max size: ${maxSize})`}
        </Typography>
      </Box>
    </Box>
  );
};