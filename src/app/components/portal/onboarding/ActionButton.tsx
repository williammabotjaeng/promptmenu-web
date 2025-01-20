import * as React from 'react';
import { Button } from '@mui/material';
import { ActionButtonProps } from '@/types/Props/ActionButtonProps';

export const ActionButton: React.FC<ActionButtonProps> = ({ label, variant, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant={variant === 'primary' ? 'contained' : 'outlined'}
      sx={{
        px: 3, 
        py: 2, 
        borderRadius: '8px',
        backgroundColor: variant === 'primary' ? '#977342' : 'transparent',
        color: variant === 'primary' ? 'black' : '#4B5563', 
        border: variant === 'secondary' ? '2px solid #4B5563' : 'none',
        '&:hover': {
          backgroundColor: variant === 'primary' ? '#FFA500' : 'rgba(0, 0, 0, 0.1)',
          color: variant === 'primary' ? 'black' : '#4B5563',
        },
      }}
    >
      {label}
    </Button>
  );
};