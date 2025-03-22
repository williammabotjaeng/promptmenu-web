import * as React from 'react';
import { styled } from '@mui/material/styles';
import { 
  Box, 
  LinearProgress, 
  linearProgressClasses, 
  Typography,
  Link, 
  IconButton, 
  Drawer, 
  useMediaQuery,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Fade,
  Divider,
  Tooltip,
  Badge
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

// Styled progress bar with gold accent color
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 16,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.mode === 'light' ? '#f0f0f0' : '#2b2b2b',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 16,
    backgroundColor: '#977342',
    backgroundImage: 'linear-gradient(90deg, #977342 0%, #ceab76 100%)',
  },
}));

// Styled step connector for the stepper
const StyledStepConnector = styled('div')(({ theme }) => ({
  height: 3,
  width: '100%',
  backgroundColor: '#f0f0f0',
  position: 'relative',
  margin: '0 8px',
}));

interface HeaderWithProgressBarProps {
  progressValue: number;
  indexValue: number;
}

const DeadlineHeaderWithProgressBar: React.FC<HeaderWithProgressBarProps> = ({ 
  progressValue, 
  indexValue 
}) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  // Define steps with more detailed information
  const steps = [
    { label: 'Event Details', description: 'Basic information about your event' },
    { label: 'Media Upload', description: 'Add photos and videos' },
    { label: 'Review & Create', description: 'Verify event information' },
    { label: 'Add a Role', description: 'Define position requirements' },
    { label: 'Application Deadline', description: 'Set closing dates' },
  ];

  // Custom StepIcon component
  const CustomStepIcon = ({ index }: { index: number }) => {
    if (index < indexValue) {
      return <CheckCircleIcon sx={{ color: '#977342', fontSize: 22 }} />;
    }
    if (index === indexValue) {
      return (
        <Badge
          overlap="circular"
          badgeContent=" "
          variant="dot"
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: '#977342',
              boxShadow: '0 0 0 2px #fff'
            }
          }}
        >
          <RadioButtonUncheckedIcon sx={{ color: '#977342', fontSize: 22 }} />
        </Badge>
      );
    }
    return <RadioButtonUncheckedIcon sx={{ color: '#aaa', fontSize: 22 }} />;
  };

  return (
    <Box sx={{ 
      mb: 4, 
      mt: 4, 
      width: '100%', 
      position: 'relative',
      maxWidth: { xs: '100%', md: '90%', lg: '85%' },
      mx: 'auto' 
    }}>
      {/* Mobile Menu Button */}
      {!isMediumScreen && (
        <Tooltip title="View progress" arrow>
          <IconButton 
            onClick={toggleDrawer(true)} 
            sx={{ 
              position: 'absolute', 
              top: -5, 
              left: 0,
              zIndex: 1,
              border: '1px solid #f0f0f0',
              borderRadius: 1.5,
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              '&:hover': {
                backgroundColor: '#f9f5f0',
              }
            }}
          >
            <MenuIcon sx={{ color: '#977342' }} />
          </IconButton>
        </Tooltip>
      )}

      {/* Desktop/Tablet Progress View */}
      <Fade in={true} timeout={800}>
        <Box 
          sx={{ 
            display: { xs: 'none', md: 'block' },
            mb: 2,
          }}
        >
          {/* Current Step Label */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                fontWeight: 500,
              }}
            >
              Current Step:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#977342',
                fontWeight: 600,
                ml: 1,
              }}
            >
              {steps[indexValue].label}
            </Typography>
          </Box>

          {/* Progress Bar */}
          <Box sx={{ position: 'relative', mb: 3 }}>
            <BorderLinearProgress 
              variant="determinate" 
              value={progressValue} 
            />
            <Typography 
              variant="caption" 
              sx={{ 
                position: 'absolute',
                right: 0,
                top: -20,
                color: '#977342',
                fontWeight: 600,
              }}
            >
              {Math.round(progressValue)}%
            </Typography>
          </Box>

          {/* Step Indicators */}
          {isLargeScreen && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
              {steps.map((step, idx) => (
                <Box 
                  key={idx} 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    width: '20%',
                    position: 'relative',
                  }}
                >
                  <CustomStepIcon index={idx} />
                  <Typography
                    variant="caption"
                    sx={{
                      color: idx === indexValue ? '#977342' : '#666',
                      fontWeight: idx === indexValue ? 600 : 400,
                      textAlign: 'center',
                      mt: 1,
                      fontSize: idx === indexValue ? '0.775rem' : '0.7rem',
                      lineHeight: 1.2,
                    }}
                  >
                    {step.label}
                  </Typography>

                  {/* Connector line between steps */}
                  {idx < steps.length - 1 && (
                    <Box 
                      sx={{ 
                        position: 'absolute',
                        top: 11,
                        left: '60%',
                        width: '80%',
                        height: 2,
                        bgcolor: idx < indexValue ? '#977342' : '#e0e0e0'
                      }} 
                    />
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Fade>

      {/* Close Button */}
      <Link href="/dashboard" sx={{ textDecoration: 'none' }}>
        <Tooltip title="Exit to dashboard" arrow>
          <IconButton 
            sx={{ 
              position: 'absolute', 
              top: { xs: -5, md: -5 }, 
              right: { xs: 0, md: -10 },
              color: '#977342',
              backgroundColor: '#fff',
              border: '1px solid #f0f0f0',
              borderRadius: 1.5,
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              '&:hover': {
                backgroundColor: '#f9f5f0',
                color: '#d32f2f',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Link>

      {/* Mobile Drawer */}
      <Drawer 
        anchor="left" 
        open={drawerOpen} 
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
            width: 280,
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#977342', fontWeight: 600 }}>
              Your Progress
            </Typography>
            <IconButton onClick={toggleDrawer(false)} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <BorderLinearProgress variant="determinate" value={progressValue} />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Typography variant="body2" sx={{ color: '#977342', fontWeight: 500 }}>
              {Math.round(progressValue)}% complete
            </Typography>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ mt: 2 }}>
            {steps.map((step, idx) => (
              <Box 
                key={idx} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  mb: 2.5,
                  py: 1,
                  px: 1.5,
                  borderRadius: 1.5,
                  bgcolor: idx === indexValue ? 'rgba(151, 115, 66, 0.08)' : 'transparent',
                }}
              >
                <CustomStepIcon index={idx} />
                <Box sx={{ ml: 1.5 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: idx === indexValue ? '#977342' : (idx < indexValue ? '#333' : '#666'),
                      fontWeight: idx === indexValue ? 600 : 500,
                    }}
                  >
                    {step.label}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#777',
                      display: 'block',
                      mt: 0.5,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
                {idx === indexValue && (
                  <ArrowRightAltIcon 
                    sx={{ 
                      ml: 'auto', 
                      color: '#977342',
                      fontSize: 18,
                    }} 
                  />
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default DeadlineHeaderWithProgressBar;