import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, IconButton, Drawer, useMediaQuery } from '@mui/material';

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
  indexValue: number; // New prop to signify the current step
}

const RoleHeaderWithProgressBar: React.FC<HeaderWithProgressBarProps> = ({ progressValue, indexValue }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ marginBottom: 4, mt: 4, width: { xs: '100%', md: '95%' }, position: 'relative' }}>
      {!isLargeScreen && ( 
        <IconButton onClick={toggleDrawer(true)} sx={{ position: 'absolute', top: 0, left: 0 }}>
          <MenuIcon sx={{ color: '#977342' }} />
        </IconButton>
      )}
      {isLargeScreen && ( 
        <>
          <BorderLinearProgress variant="determinate" value={progressValue} sx={{ marginTop: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
            {['Requirements', 'Details', 'Demographics', 'Payment', 'Questions'].map((label, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  color: '#977342',
                  fontSize: index === indexValue ? '1.2rem' : '0.875rem',
                  fontWeight: index === indexValue ? 'bold' : 'normal'
                }}
              >
                {label}
              </Typography>
            ))}
          </Box>
        </>
      )}
      <Link href="/dashboard">
        <CloseIcon sx={{ color: '#977342', position: 'absolute', top: { xs: 10, md: 0 }, right: { xs: 10, md: -60 }, cursor: 'pointer' }} /> 
      </Link>

      {/* Drawer for Progress Bar (only on small screens) */}
      {!isLargeScreen && (
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 250, padding: 2 }}>
            <Typography variant="h6" sx={{ color: '#977342', marginBottom: 2 }}>Progress</Typography>
            <BorderLinearProgress variant="determinate" value={progressValue} />
            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
              {['Requirements', 'Details', 'Demographics', 'Payment', 'Questions'].map((label, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    color: '#977342',
                    fontSize: index === indexValue ? '1.2rem' : '0.875rem', // Change font size based on indexValue
                    fontWeight: index === indexValue ? 'bold' : 'normal', // Bold the current step
                  }}
                >
                  {label}
                </Typography>
              ))}
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default RoleHeaderWithProgressBar;