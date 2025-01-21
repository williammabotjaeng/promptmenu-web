import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
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

const RoleHeaderWithProgressBar: React.FC<HeaderWithProgressBarProps> = ({ progressValue }) => {
  return (
    <Box sx={{ marginBottom: 4, mt: 4, width: '60%', position: 'relative' }}>
      <BorderLinearProgress variant="determinate" value={progressValue} sx={{ marginTop: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
        <Typography variant="body2" sx={{ color: '#977342' }}>Requirements</Typography>
        <Typography variant="body2" sx={{ color: '#977342', textAlign: 'right' }}>Details</Typography>
        <Typography variant="body2" sx={{ color: '#977342', textAlign: 'right' }}>Demographics</Typography>
        <Typography variant="body2" sx={{ color: '#977342', textAlign: 'right' }}>Payment</Typography>
        <Typography variant="body2" sx={{ color: '#977342', textAlign: 'right' }}>Questions</Typography>
      </Box>
      <Link href="/dashboard">
        <CloseIcon sx={{ color: '#977342', position: 'absolute', top: 0, right: -90, cursor: 'pointer' }} /> 
      </Link>
    </Box>
  );
};

export default RoleHeaderWithProgressBar;