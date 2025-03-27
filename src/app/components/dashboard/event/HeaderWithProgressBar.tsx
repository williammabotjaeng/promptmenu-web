import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from '@mui/material';

// Styled progress bar with custom colors and border radius
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#E5E7EB',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#977342',
  },
}));

// Define interface for StepItemProps
interface StepItemProps {
  active: boolean;
}

// Step item component for each progress step
const StepItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<StepItemProps>(({ theme, active }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  padding: '0 8px',
  '@media (max-width: 768px)': {
    padding: '0 4px',
  },
  '@media (max-width: 480px)': {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    gap: '12px',
  },
  '& .stepNumber': {
    width: 28,
    height: 28,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: active ? '#977342' : '#E5E7EB',
    color: active ? '#FFFFFF' : '#6B7280',
    marginBottom: 8,
    fontWeight: 600,
    '@media (max-width: 480px)': {
      marginBottom: 0,
    },
  },
  '& .stepLabel': {
    color: active ? '#111827' : '#6B7280',
    fontWeight: active ? 600 : 400,
    fontSize: 14,
    '@media (max-width: 768px)': {
      fontSize: 13,
    },
    '@media (max-width: 480px)': {
      fontSize: 14,
    },
  }
}));

// Header container
const HeaderContainer = styled(Box)({
  padding: '20px 24px',
  borderBottom: '1px solid #E5E7EB',
  position: 'relative',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  '@media (max-width: 768px)': {
    padding: '16px 20px',
  },
  '@media (max-width: 480px)': {
    padding: '12px 16px',
  },
});

// Close button
const StyledCloseButton = styled(Link)({
  position: 'absolute',
  top: 20,
  right: 24,
  color: '#6B7280',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': {
    color: '#111827',
  }
});

interface HeaderWithProgressBarProps {
  progressValue: number;
  onClose?: () => void;
}

const HeaderWithProgressBar: React.FC<HeaderWithProgressBarProps> = ({ progressValue, onClose }) => {
  // Calculate which steps are active based on progress value
  const isStepActive = (stepPosition: number): boolean => {
    // If progressValue is 33, step 1 is active
    // If progressValue is 66, steps 1 and 2 are active
    // If progressValue is 100, all steps are active
    const thresholds = [33, 66, 100];
    return progressValue >= thresholds[stepPosition - 1];
  };

  return (
    <HeaderContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Create New Event
        </Typography>
        <StyledCloseButton onClick={onClose}>
          <CloseIcon fontSize="small" />
        </StyledCloseButton>
      </Box>

      <Box sx={{ width: '100%', mb: 2 }}>
        <BorderLinearProgress variant="determinate" value={progressValue} />
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        '@media (max-width: 480px)': {
          flexDirection: 'column',
          gap: 2
        }
      }}>
        <StepItem active={isStepActive(1)}>
          <div className="stepNumber">1</div>
          <div className="stepLabel">Event Details</div>
        </StepItem>
        <StepItem active={isStepActive(2)}>
          <div className="stepNumber">2</div>
          <div className="stepLabel">Media Upload</div>
        </StepItem>
        <StepItem active={isStepActive(3)}>
          <div className="stepNumber">3</div>
          <div className="stepLabel">Review & Create</div>
        </StepItem>
      </Box>
    </HeaderContainer>
  );
};

export default HeaderWithProgressBar;