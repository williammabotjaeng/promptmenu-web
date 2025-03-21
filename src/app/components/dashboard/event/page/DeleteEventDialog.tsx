import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteEventDialogProps {
  open: boolean;
  eventTitle: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteEventDialog: React.FC<DeleteEventDialogProps> = ({
  open,
  eventTitle,
  onClose,
  onConfirm
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-event-dialog-title"
      aria-describedby="delete-event-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 2,
          px: 1
        }
      }}
    >
      <DialogTitle id="delete-event-dialog-title" sx={{ pb: 1 }}>
        <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
          <DeleteIcon sx={{ color: '#f44336', mr: 1 }} />
          Delete Event
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-event-dialog-description">
          Are you sure you want to delete the event <strong>"{eventTitle}"</strong>? This action cannot be undone, and all related data including roles and applications will be permanently deleted.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 2, px: 3 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{ 
            borderColor: '#977342',
            color: '#977342',
            '&:hover': {
              borderColor: '#7D5F35',
              backgroundColor: 'rgba(151, 115, 66, 0.04)'
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          color="error"
          startIcon={<DeleteIcon />}
          sx={{ ml: 1 }}
        >
          Delete Event
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteEventDialog;