import * as React from 'react';
import { Box, Typography, IconButton, Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import SSHGoldLogo from '@/assets/GoldLogo.png';
import { StepItem } from '@/components/portal/onboarding/StepItem';
import { OnboardingHeaderProps } from '@/types/Props/OnboardingHeaderProps';

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({ 
  steps, 
  onClose
}) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Find the active step index
  const activeStepIndex = steps.findIndex(step => step.isActive);
  
  // Calculate progress percentage
  const totalSteps = steps.length;
  const progressPercentage = totalSteps > 1 
    ? Math.round(((activeStepIndex >= 0 ? activeStepIndex : 0) / (totalSteps - 1)) * 100) 
    : 0;

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: 'black', 
      width: '100%'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingTop: 2,
        paddingX: { xs: 2, md: 4 }
      }}>
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

        {/* Progress indicator */}
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          alignItems: 'center',
          justifyContent: 'center',
          color: '#977342'
        }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            {progressPercentage}% Complete
          </Typography>
          <Box sx={{ 
            width: '100px', 
            height: '8px', 
            backgroundColor: '#333',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              width: `${progressPercentage}%`, 
              height: '100%', 
              backgroundColor: '#977342',
              transition: 'width 0.3s ease'
            }} />
          </Box>
        </Box>

        {/* Menu Icon for Drawer on smaller screens */}
        <IconButton 
          onClick={toggleDrawer(true)} 
          sx={{ 
            color: '#977342', 
            display: { xs: 'flex', md: 'none' }, 
            alignItems: 'center',
            flexDirection: 'column',
            gap: 0.5
          }}
        >
          <MenuIcon />
          <Typography sx={{ fontSize: '10px' }}>
            Check Progress
          </Typography>
        </IconButton>

        {/* Steps Section for larger screens */}
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          flexDirection: 'row', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          gap: 1,
          marginTop: 2, 
          textAlign: 'center', 
          marginLeft: '80px' 
        }}>
          {steps.map((step) => (
            <StepItem
              key={step.number}
              number={step.number}
              title={step.title}
              isActive={step.isActive}
            />
          ))}
        </Box>

        {/* Close button */}
        <Box>
          <CloseIcon
            onClick={onClose}
            sx={{ 
              color: 'white', 
              width: '18px', 
              height: '18px', 
              marginRight: '40px', 
              marginBottom: '50px', 
              fontWeight: 'bold', 
              cursor: 'pointer' 
            }}
          />
        </Box>
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Onboarding Progress</Typography>
            <IconButton onClick={toggleDrawer(false)} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ color: '#977342', mb: 1 }}>
              {progressPercentage}% Complete
            </Typography>
            <Box sx={{ 
              width: '100%', 
              height: '8px', 
              backgroundColor: '#333',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <Box sx={{ 
                width: `${progressPercentage}%`, 
                height: '100%', 
                backgroundColor: '#977342'
              }} />
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {steps.map((step) => (
              <StepItem
                key={step.number}
                number={step.number}
                title={step.title}
                isActive={step.isActive}
              />
            ))}
          </Box>
        </Box>
      </Drawer>
      
      {/* Mobile progress indicator */}
      <Box sx={{ 
        display: { xs: 'flex', md: 'none' }, 
        alignItems: 'center',
        justifyContent: 'center',
        color: '#977342',
        mt: 1,
        mb: 2
      }}>
        <Typography variant="caption" sx={{ mr: 1 }}>
          Step {activeStepIndex + 1} of {totalSteps}
        </Typography>
        <Box sx={{ 
          flex: 1,
          maxWidth: '150px',
          height: '4px', 
          backgroundColor: '#333',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <Box sx={{ 
            width: `${progressPercentage}%`, 
            height: '100%', 
            backgroundColor: '#977342',
            transition: 'width 0.3s ease'
          }} />
        </Box>
      </Box>
    </Box>
  );
};

export default OnboardingHeader;