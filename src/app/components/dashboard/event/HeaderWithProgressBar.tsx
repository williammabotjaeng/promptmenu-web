import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from '@mui/material';
import { useStore } from 'zustand';
import { useCookies } from 'react-cookie';
import useEventStore from '@/state/use-event-store';
import { useEvent } from 'react-use';

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

const { clearEventDetails, clearEventMedia, clearEventRole } = useStore(useEventStore);

const [cookies, removeCookie] = useCookies([
    "company_id", "event_poster", "event_id",
    "event_photos", "event_video", "questions"
]);

const handleClose = () => {
  removeCookie("company_id", { path: "/" });
  removeCookie("event_poster", { path: "/" });
  removeCookie("event_id", { path: "/" });
  removeCookie("event_photos", { path: "/" });
  removeCookie("event_video", { path: "/" });
  removeCookie("questions", { path: "/" });
  clearEventDetails();
  clearEventRole();
  clearEventMedia();
}

interface HeaderWithProgressBarProps {
  progressValue: number; 
}

const HeaderWithProgressBar: React.FC<HeaderWithProgressBarProps> = ({ progressValue }) => {
  return (
    <Box sx={{ marginBottom: 4, mt: 4, width: '60%', position: 'relative' }}>
      <BorderLinearProgress variant="determinate" value={progressValue} sx={{ marginTop: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
        <Typography variant="body2" sx={{ color: '#977342', textAlign: { xs: 'center'} }}>Event Details</Typography>
        <Typography variant="body2" sx={{ color: '#977342', textAlign: {xs: 'center', md: 'right'} }}>Media Upload</Typography>
        <Typography variant="body2" sx={{ color: '#977342', textAlign: {xs: 'center', md: 'right'} }}>Review & Create</Typography>
      </Box>
      <Box onClick={handleClose}>
        <CloseIcon sx={{ color: '#977342', position: 'absolute', top: 0, right: { xs: -50, md: -90 }, cursor: 'pointer' }} /> 
      </Box>
    </Box>
  );
};

export default HeaderWithProgressBar;