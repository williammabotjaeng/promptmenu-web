import { Box, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { styled } from '@mui/material/styles';

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
  console.log("Image Value:", image);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px dotted #977342',
        borderRadius: '8px',
        padding: 2,
        position: 'relative',
        maxWidth: '400px',
        height: image ? 'auto' : '200px',
        mx: 'auto',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: '#7D5F35',
          backgroundColor: 'rgba(151, 115, 66, 0.04)',
        },
      }}
    >
      {image ? (
        <Box sx={{ position: 'relative', width: '100%' }}>
          <Box
            component="img"
            src={image}
            alt="Uploaded image"
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: '4px',
              objectFit: 'cover',
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
              boxShadow: 2,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 1)',
              },
            }}
            size="small"
          >
            <DeleteIcon sx={{ color: '#f44336' }} />
          </IconButton>
        </Box>
      ) : (
        // This block renders when image is null or empty
        <label htmlFor="upload-button-img">
          <Input
            accept="image/*"
            id="upload-button-img"
            type="file"
            onChange={onImageUpload}
          />
          <Button
            variant="outlined"
            component="span"
            startIcon={<CameraAltIcon />}
            sx={{
              color: '#977342',
              borderColor: '#977342',
              '&:hover': {
                borderColor: '#7D5F35',
                backgroundColor: 'rgba(151, 115, 66, 0.04)',
              },
              padding: '10px 20px',
            }}
          >
            Upload Image
          </Button>
        </label>
      )}
    </Box>
  );
};

export default ImageUploader;