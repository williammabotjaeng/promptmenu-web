import * as React from 'react';
import { Checkbox, FormControlLabel, Box } from '@mui/material';
import { CheckboxItemProps } from '@/types/Props/CheckboxItemProps';

export const CheckboxItem: React.FC<CheckboxItemProps> = ({ label }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', paddingY: 1 }}>
      <FormControlLabel
        control={
          <Checkbox
            id={label.toLowerCase().replace(/\s/g, '-')}
            sx={{
              '&.Mui-checked': {
                color: '#4B5563',
              },
            }}
            aria-label={label}
          />
        }
        label={label}
        sx={{ marginLeft: 1 }}
      />
    </Box>
  );
};