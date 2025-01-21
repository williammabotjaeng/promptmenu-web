import * as React from 'react';
import { DateTimePicker } from './DeadlineDateTimePicker';
import { DeadlineFormProps } from '@/types/Props/DeadlineFormProps';
import { Box, Button, TextField, Typography } from '@mui/material';

export const DeadlineForm: React.FC<DeadlineFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = React.useState({
    softDeadline: '',
    hardDeadline: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', paddingBottom: '16px', marginTop: '24px', width: '70%' }}>
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="body2" sx={{ color: "#374151"}}>
          By when do you want to stop receiving applications.
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
        <DateTimePicker
          label="Soft Deadline"
        />
        <DateTimePicker
          label="Hard Deadline"
        />
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="body2" sx={{ color: '#374151', fontWeight: 'medium' }}>
          Any notes or remarks?
        </Typography>
        <TextField
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          sx={{ marginTop: 1 }}
        />
      </Box>

      
    </form>
  );
};