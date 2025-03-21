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
import PublishIcon from '@mui/icons-material/Publish';
import UnpublishedIcon from '@mui/icons-material/Unpublished';

interface PublishEventDialogProps {
  open: boolean;
  eventTitle: string;
  isCurrentlyPublished: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PublishEventDialog: React.FC<PublishEventDialogProps> = ({
  open,
  eventTitle,
  isCurrentlyPublished,
  onClose,
  onConfirm
}) => {
  const isPublishing = !isCurrentlyPublished;
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="publish-event-dialog-title"
      aria-describedby="publish-event-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 2,
          px: 1
        }
      }}
    >
      <DialogTitle id="publish-event-dialog-title" sx={{ pb: 1 }}>
        <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
          {isPublishing ? (
            <>
              <PublishIcon sx={{ color: '#4CAF50', mr: 1 }} />
              Publish Event
            </>
          ) : (
            <>
              <UnpublishedIcon sx={{ color: '#FF9800', mr: 1 }} />
              Unpublish Event
            </>
          )}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="publish-event-dialog-description">
          {isPublishing ? (
            <>
              Are you sure you want to publish <strong>"{eventTitle}"</strong>? 
              Once published, this event will be visible to everyone across the platform and to the public.
            </>
          ) : (
            <>
              Are you sure you want to unpublish <strong>"{eventTitle}"</strong>? 
              Once unpublished, this event will no longer be visible to the public or other users on the platform.
            </>
          )}
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
          color={isPublishing ? "success" : "warning"}
          startIcon={isPublishing ? <PublishIcon /> : <UnpublishedIcon />}
          sx={{ ml: 1 }}
        >
          {isPublishing ? 'Publish Event' : 'Unpublish Event'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PublishEventDialog;