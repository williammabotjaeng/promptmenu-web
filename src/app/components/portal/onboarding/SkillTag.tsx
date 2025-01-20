import * as React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; 
import { SkillTagProps } from '@/types/Props/SkillTagProps';

export const SkillTag: React.FC<SkillTagProps> = ({ name }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2.5, 
        px: 2, 
        py: 1, 
        borderRadius: '20px', 
        backgroundColor: '#977342' 
      }}
    >
      <Typography variant="body1" sx={{ color: 'white' }}>
        {name}
      </Typography>
    </Box>
  );
};