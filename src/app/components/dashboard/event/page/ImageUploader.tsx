import { Box, IconButton, Button, Typography, Paper, Fade, Skeleton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

// Styled component for the file input
const Input = styled('input')({
  display: 'none',
});

interface SingleImageProps {
  image: string | null;
  onImageUpload: (newImage: React.ChangeEvent<any>) => void;
  onDeleteImage: () => void;
}

const ImageUploader: React.FC<SingleImageProps> = ({ image, onDeleteImage, onImageUpload }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleImageLoad = () => {
    setTimeout(() => setIsLoading(false), 300); // Small delay for smoother transition
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setIsLoading(true);
      // Create a synthetic event to pass to the handler
      const syntheticEvent = {
        target: {
          files: e.dataTransfer.files
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      
      onImageUpload(syntheticEvent);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: image ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: isDragging 
            ? '2px dashed #977342' 
            : image 
              ? '1px solid rgba(0,0,0,0.08)' 
              : '2px dashed rgba(151, 115, 66, 0.3)',
          borderRadius: '12px',
          padding: 2,
          position: 'relative',
          height: image ? 'auto' : '200px',
          backgroundColor: isDragging 
            ? 'rgba(151, 115, 66, 0.05)' 
            : image 
              ? 'white' 
              : 'rgba(250, 250, 250, 0.5)',
          transition: 'all 0.3s ease',
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isLoading && (
          <Skeleton 
            variant="rectangular" 
            width="100%" 
            height={240} 
            animation="wave"
            sx={{ 
              borderRadius: '8px',
              bgcolor: 'rgba(151, 115, 66, 0.1)'
            }}
          />
        )}
        
        {image ? (
          <Fade in={!isLoading} timeout={400}>
            <Box sx={{ position: 'relative', width: '100%' }}>
              <Box
                component="img"
                src={image}
                alt="Uploaded poster"
                onLoad={handleImageLoad}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.01)',
                  },
                }}
              />
              <IconButton
                onClick={onDeleteImage}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '50%',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 1)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease',
                }}
                size="small"
              >
                <DeleteIcon sx={{ color: '#d32f2f', fontSize: '18px' }} />
              </IconButton>
            </Box>
          </Fade>
        ) : (
          <Fade in={!isLoading} timeout={400}>
            <Box 
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
              }}
            >
              <InsertPhotoIcon 
                sx={{ 
                  color: 'rgba(151, 115, 66, 0.3)', 
                  fontSize: 48,
                  mb: 2
                }}
              />
              
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#777',
                  mb: 3,
                  textAlign: 'center'
                }}
              >
                Upload a poster image to showcase your event
              </Typography>
              
              <label htmlFor="upload-button-img">
                <Input
                  accept="image/*"
                  id="upload-button-img"
                  type="file"
                  onChange={(e) => {
                    setIsLoading(true);
                    onImageUpload(e);
                  }}
                />
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CameraAltIcon />}
                  sx={{
                    backgroundColor: '#977342',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#CEAB76',
                    },
                    padding: '10px 20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(151, 115, 66, 0.2)',
                  }}
                >
                  Upload Poster
                </Button>
              </label>
              
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#999',
                  mt: 2
                }}
              >
                Or drag and drop image here
              </Typography>
            </Box>
          </Fade>
        )}
      </Box>
    </Paper>
  );
};

export default ImageUploader;