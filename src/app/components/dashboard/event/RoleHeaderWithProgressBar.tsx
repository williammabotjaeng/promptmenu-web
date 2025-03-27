"use client";

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
  Badge,
  Tooltip,
  Fade,
  Divider,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

// Enhanced styled progress bar with gradient
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#F3F4F6',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 10,
    backgroundColor: '#977342',
    backgroundImage: 'linear-gradient(90deg, #977342 0%, #CEAB76 100%)',
  },
}));

// Define interfaces for custom styled components
interface StepIndicatorProps {
  active?: boolean;
  completed?: boolean;
}

interface StepConnectorProps {
  active?: boolean;
  completed?: boolean;
}

// Styled step indicator with proper TypeScript interface
const StepIndicator = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'completed'
})<StepIndicatorProps>(({ theme, active, completed }) => ({
  minWidth: 30,
  height: 30,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: completed ? '#977342' : active ? '#977342' : '#E5E7EB',
  color: completed || active ? 'white' : '#6B7280',
  fontWeight: 600,
  boxShadow: active ? '0 2px 8px rgba(151, 115, 66, 0.25)' : 'none',
  transition: 'all 0.3s ease',
}));

// Step connector line with proper TypeScript interface
const StepConnector = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'completed'
})<StepConnectorProps>(({ theme, active, completed }) => ({
  height: 2,
  flexGrow: 1,
  backgroundColor: completed ? '#977342' : '#E5E7EB',
  transition: 'background-color 0.3s ease',
}));

interface HeaderWithProgressBarProps {
  progressValue: number;
  indexValue: number;
}

const RoleHeaderWithProgressBar: React.FC<HeaderWithProgressBarProps> = ({ 
  progressValue, 
  indexValue 
}) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  // Define steps with descriptions
  const steps = [
    { label: 'Requirements', description: 'Basic job requirements' },
    { label: 'Details', description: 'Role specifications' },
    { label: 'Demographics', description: 'Candidate attributes' },
    { label: 'Payment', description: 'Compensation details' },
    { label: 'Questions', description: 'Screening questions' },
  ];

  return (
    <Box sx={{ 
      mb: 4, 
      mt: 4, 
      width: { xs: '100%', md: '92%' }, 
      mx: 'auto', 
      position: 'relative'
    }}>
      {/* Mobile menu button */}
      {!isLargeScreen && (
        <Tooltip title="View progress steps">
          <Paper
            elevation={2}
            sx={{
              position: 'absolute',
              top: -5,
              left: 0,
              borderRadius: '50%',
              overflow: 'hidden',
              zIndex: 2,
            }}
          >
            <IconButton 
              onClick={toggleDrawer(true)}
              sx={{ 
                bgcolor: 'white',
                color: '#977342',
                '&:hover': {
                  bgcolor: '#f9f5f0',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Paper>
        </Tooltip>
      )}

      {/* Close button */}
      <Tooltip title="Return to dashboard">
        <Paper
          elevation={2}
          sx={{
            position: 'absolute',
            top: { xs: -5, md: -5 },
            right: { xs: 0, md: -40 },
            borderRadius: '50%',
            overflow: 'hidden',
            zIndex: 2,
          }}
        >
          <Link href="/dashboard" sx={{ textDecoration: 'none' }}>
            <IconButton 
              sx={{ 
                bgcolor: 'white',
                color: '#977342',
                '&:hover': {
                  bgcolor: '#f9f5f0',
                  color: '#d32f2f',
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Link>
        </Paper>
      </Tooltip>

      {/* Progress indicator for all screen sizes */}
      <Fade in={true} timeout={800}>
        <Box>
          {/* Current step and progress percentage */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 2,
            mt: { xs: 4, md: 0 },
            ml: { xs: 5, md: 0 }
          }}>
            {isMediumScreen ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#6B7280', 
                    mr: 1 
                  }}
                >
                  Current Step:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#977342',
                    fontWeight: 600,
                  }}
                >
                  {steps[indexValue].label}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#977342',
                    fontWeight: 600,
                  }}
                >
                  Step {indexValue + 1}/{steps.length}
                </Typography>
              </Box>
            )}
            
            <Chip 
              label={`${Math.round(progressValue)}%`} 
              size="small"
              sx={{
                bgcolor: 'rgba(151, 115, 66, 0.1)',
                color: '#977342',
                fontWeight: 600,
                border: '1px solid rgba(151, 115, 66, 0.2)',
              }}
            />
          </Box>
          
          {/* Progress bar */}
          <BorderLinearProgress 
            variant="determinate" 
            value={progressValue} 
          />
          
          {/* Step indicators - only on large screens */}
          {isLargeScreen && (
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                mt: 2,
                px: 1,
              }}
            >
              {steps.map((step, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    position: 'relative',
                    width: `${100 / steps.length}%`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 1 }}>
                    {index > 0 && (
                      <StepConnector 
                        completed={index <= indexValue} 
                        active={index === indexValue}
                        sx={{ mr: 1 }}
                      />
                    )}
                    
                    <StepIndicator 
                      active={index === indexValue} 
                      completed={index < indexValue}
                    >
                      {index < indexValue ? (
                        <CheckCircleIcon fontSize="small" />
                      ) : (
                        index + 1
                      )}
                    </StepIndicator>
                    
                    {index < steps.length - 1 && (
                      <StepConnector 
                        completed={index < indexValue} 
                        active={index === indexValue}
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Box>
                  
                  <Typography
                    variant="body2"
                    sx={{
                      color: index === indexValue ? '#977342' : '#6B7280',
                      fontWeight: index === indexValue ? 600 : 400,
                      textAlign: 'center',
                      maxWidth: '90%',
                      fontSize: index === indexValue ? '0.875rem' : '0.8rem',
                    }}
                  >
                    {step.label}
                  </Typography>
                  
                  {index === indexValue && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#6B7280',
                        textAlign: 'center',
                        display: 'block',
                        mt: 0.5,
                      }}
                    >
                      {step.description}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Fade>

      {/* Mobile drawer */}
      <Drawer 
        anchor="left" 
        open={drawerOpen} 
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#977342', fontWeight: 600 }}>
              Role Creation Progress
            </Typography>
            <IconButton onClick={toggleDrawer(false)} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <BorderLinearProgress variant="determinate" value={progressValue} />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 3 }}>
            <Typography variant="body2" sx={{ color: '#977342', fontWeight: 600 }}>
              {Math.round(progressValue)}% Complete
            </Typography>
          </Box>
          
          <Divider />
          
          <Box sx={{ mt: 3 }}>
            {steps.map((step, index) => (
              <Box 
                key={index} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  p: 1.5,
                  mb: 1.5,
                  borderRadius: 2,
                  bgcolor: index === indexValue ? 'rgba(151, 115, 66, 0.1)' : 'transparent',
                  border: index === indexValue ? '1px solid rgba(151, 115, 66, 0.2)' : 'none'
                }}
              >
                <StepIndicator 
                  active={index === indexValue} 
                  completed={index < indexValue}
                  sx={{ mr: 2, flexShrink: 0, width: 28, height: 28 }}
                >
                  {index < indexValue ? (
                    <CheckCircleIcon sx={{ fontSize: 16 }} />
                  ) : (
                    index + 1
                  )}
                </StepIndicator>
                
                <Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: index === indexValue ? 600 : 400,
                      color: index === indexValue ? '#977342' : index < indexValue ? '#111827' : '#6B7280'
                    }}
                  >
                    {step.label}
                  </Typography>
                  
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: index === indexValue ? '#6B7280' : 'text.secondary',
                      display: 'block',
                      mt: 0.5
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
                
                {index === indexValue && (
                  <ArrowRightAltIcon sx={{ ml: 'auto', color: '#977342' }} />
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default RoleHeaderWithProgressBar;