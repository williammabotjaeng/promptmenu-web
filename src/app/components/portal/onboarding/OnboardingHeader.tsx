import * as React from 'react';
import { Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import SSHGoldLogo from '@/assets/GoldLogo.png';
import { StepItem } from '@/components/portal/onboarding/StepItem';
import { OnboardingHeaderProps } from '@/types/Props/OnboardingHeaderProps';

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({ steps, onClose }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Typography variant="h5" sx={{ color: '#977342', fontWeight: 'bold', marginLeft: '20px' }}>
          <span>Staffing</span> <span style={{ display: 'block' }}>Solutions Hub</span>
        </Typography>
        <Image
          loading="lazy"
          src={SSHGoldLogo.src}
          alt="Profile preview"
          width={100}
          height={105}
          style={{ objectFit: 'contain', marginLeft: '-32px', marginTop: '20px' }}
        />
        {/* Steps Section */}
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 2, textAlign: 'center', marginLeft: '80px' }}>
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