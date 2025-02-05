import * as React from 'react';
import { Box, Typography, IconButton, Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import SSHGoldLogo from '@/assets/GoldLogo.png';
import { StepItem } from '@/components/portal/onboarding/StepItem';
import { OnboardingHeaderProps } from '@/types/Props/OnboardingHeaderProps';

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({ steps, onClose }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ color: '#977342', fontWeight: 'bold', marginLeft: '20px' }}>
          <span>Staffing</span> <span style={{ display: 'block' }}>Solutions Hub</span>
        </Typography>
        <Image
          loading="lazy"
          src={SSHGoldLogo.src}
          alt="Profile preview"
          width={100}
          height={105}
          style={{ objectFit: 'contain', marginLeft: '-24px', marginTop: '20px' }}
        />
      </Box>

      {/* Menu Icon for Drawer on smaller screens */}
      <IconButton onClick={toggleDrawer(true)} sx={{ color: '#977342', display: { xs: 'block', md: 'none' }, marginRight: '20px' }}>
        <MenuIcon /><Typography sx={{
          fontSize: '10px'
        }}>&nbsp;Check Progress</Typography>
      </IconButton>

      {/* Steps Section for larger screens */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row', justifyContent: 'center', marginTop: 2, textAlign: 'center', marginLeft: '80px' }}>
        {steps.map((step) => (
          <StepItem
            key={step.number}
            number={step.number}
            title={step.title}
            isActive={step.isActive}
          />
        ))}
      </Box>

      {/* Drawer for Steps on smaller screens */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            padding: 2,
            backgroundColor: '#111111',
            height: '100%',
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Onboarding Steps</Typography>
            <IconButton onClick={toggleDrawer(false)} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          {steps.map((step) => (
            <StepItem
              key={step.number}
              number={step.number}
              title={step.title}
              isActive={step.isActive}
            />
          ))}
        </Box>
      </Drawer>

      <Box>
        <CloseIcon 
          onClick={onClose} 
          sx={{ color: 'white', width: '18px', height: '18px', marginRight: '40px', marginBottom: '50px', fontWeight: 'bold', cursor: 'pointer' }} 
        />
      </Box>
    </Box>
  );
};

export default OnboardingHeader;