import * as React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';

interface EventUploadSectionProps {
  title: string;
  icon: string;
  buttonText: string;
  description: string;
  type: 'single' | 'multiple';
  mediaType: 'photo' | 'video';
}

export const EventUploadSection: React.FC<EventUploadSectionProps> = ({
  title,
  icon,
  buttonText,
  description,
  type,
  mediaType,
}) => {
  const [state, setState] = React.useState<Record<string, File[]>>({});

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setState((prevState) => ({
        ...prevState,
        [title]: type === 'single' ? [filesArray[0]] : [...(prevState[title] || []), ...filesArray],
      }));
    }
  };

  // Trigger file input click
  const handleButtonClick = () => {
    document.getElementById(`file-upload-input-${title}`)?.click();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: { xs: 2, sm: 3 },
        borderRadius: 2,
        backgroundColor: 'rgba(151, 115, 66, 0.1)',
        width: { xs: '100%', sm: '80%', md: '60%' },
        margin: '0 auto',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          paddingBottom: 1,
          color: '#977342',
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 3,
          marginTop: 2,
          border: '2px dashed',
          borderColor: 'rgba(151, 115, 66, 0.5)',
          borderRadius: 2,
          backgroundColor: 'transparent',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '173px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '40px',
              minHeight: '36px',
            }}
          >
            <img
              loading="lazy"
              src={icon}
              alt={title}
              style={{
                objectFit: 'contain',
                width: '100%',
                height: 'auto',
              }}
            />
          </Box>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              color: '#CEAB76',
              marginTop: 1,
            }}
          >
            {description}
          </Typography>
          <Button
            variant="contained"
            onClick={handleButtonClick}
            sx={{
              marginTop: 2,
              backgroundColor: '#977342',
              color: 'white',
              '&:hover': {
                backgroundColor: '#CEAB76',
              },
              width: '100%',
            }}
          >
            {buttonText}
          </Button>
          {/* Hidden file input */}
          <input
            id={`file-upload-input-${title}`}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            multiple={type === 'multiple'} // Allow multiple file selection if type is 'multiple'
          />
        </Box>
        {/* Display uploaded files */}
        <Box sx={{ marginTop: 3, width: '100%' }}>
          {type === 'single' && state[title]?.length > 0 && (
            <Box sx={{ textAlign: 'center' }}>
              {mediaType === 'photo' ? (
                <img
                  src={URL.createObjectURL(state[title][0])}
                  alt="Uploaded"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    borderRadius: '8px',
                  }}
                />
              ) : (
                <video
                  controls
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    borderRadius: '8px',
                  }}
                >
                  <source src={URL.createObjectURL(state[title][0])} type={state[title][0].type} />
                  Your browser does not support the video tag.
                </video>
              )}
            </Box>
          )}
          {type === 'multiple' && state[title]?.length > 0 && (
            <Grid container spacing={2}>
              {state[title].map((file, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  {mediaType === 'photo' ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded ${index}`}
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                      }}
                    />
                  ) : (
                    <video
                      controls
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                      }}
                    >
                      <source src={URL.createObjectURL(file)} type={file.type} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};