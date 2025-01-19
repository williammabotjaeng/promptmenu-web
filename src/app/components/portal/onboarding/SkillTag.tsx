import * as React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { SkillTagProps } from '@/types/Props/SkillTagProps';

export const SkillTag: React.FC<SkillTagProps> = ({ name, onRemove }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2.5, 
        px: 4, 
        py: 3, 
        borderRadius: '20px', 
        backgroundColor: '#4B5563' 
      }}
    >
      <Typography variant="body1" sx={{ color: 'white' }}>
        {name}
      </Typography>
      <IconButton 
        onClick={onRemove} 
        aria-label={`Remove ${name} skill`} 
        sx={{ padding: 0 }} 
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/8a7637432ebb7431c1f68ae024224eb0bd6e4672e8cba8adc4f5275a5c0745f0?apiKey=7fae980a988640eea8add1e49a5d542e&"
          alt=""
          style={{ width: '12px', height: 'auto' }} 
        />
      </IconButton>
    </Box>
  );
};