import * as React from 'react';
import { Checkbox, FormControlLabel, Box } from '@mui/material';

interface ExtendedCheckboxItemProps {
  label: string;
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxItem: React.FC<ExtendedCheckboxItemProps> = ({ label, value, onChange }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        paddingY: 1, 
        flexDirection: { xs: 'column', sm: 'row' }, 
        justifyContent: 'flex-start' 
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            id={label.toLowerCase().replace(/\s/g, '-')}
            checked={value} 
            onChange={onChange} 
            sx={{
              '&.Mui-checked': {
                color: '#4B5563',
              },
            }}
            aria-label={label}
          />
        }
        label={label}
        sx={{ marginLeft: { xs: 0, sm: 1 }, marginTop: { xs: 1, sm: 0 } }}
      />
    </Box>
  );
};