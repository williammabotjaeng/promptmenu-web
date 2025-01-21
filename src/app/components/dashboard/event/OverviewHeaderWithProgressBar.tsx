import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Link } from '@mui/material';

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

interface HeaderWithProgressBarProps {
  progressValue: number; 
}

const OverviewHeaderWithProgressBar: React.FC<HeaderWithProgressBarProps> = ({ progressValue }) => {
  return (
    <Box sx={{ marginBottom: 4, mt: 4, width: '90%', position: 'relative' }}>
      <BorderLinearProgress variant="determinate" value={progressValue} sx={{ marginTop: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: '#977342' }}>Create Event</Typography>
          <CheckCircleIcon sx={{ color: 'success.main', marginLeft: 1 }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: '#977342', textAlign: 'right' }}>Create Role</Typography>
          <CheckCircleIcon sx={{ color: 'success.main', marginLeft: 1 }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: '#977342', textAlign: 'right' }}>Ready to Publish</Typography>
          <EmojiEventsIcon sx={{ color: 'primary.main', marginLeft: 1 }} />
        </Box>
      </Box>
      <Link href="/dashboard">
        <CloseIcon sx={{ color: '#977342', position: 'absolute', top: 0, right: -90, cursor: 'pointer' }} /> 
      </Link>
    </Box>
  );
};

export default OverviewHeaderWithProgressBar;