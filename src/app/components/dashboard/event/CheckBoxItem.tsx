import * as React from 'react';
import { Checkbox, FormControlLabel, Box } from '@mui/material';
import { CheckboxItemProps } from '@/types/Props/CheckboxItemProps';

export const CheckboxItem: React.FC<CheckboxItemProps> = ({ label }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        paddingY: 1, 
        flexDirection: { xs: 'column', sm: 'row' }, // Stack on small screens, row on larger
        justifyContent: 'flex-start' 
      }}
    >
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
        sx={{ marginLeft: { xs: 0, sm: 1 }, marginTop: { xs: 1, sm: 0 } }} // Adjust margins for responsiveness
      />
    </Box>
  );
};