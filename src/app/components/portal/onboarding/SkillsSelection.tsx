import * as React from 'react';
import { Box, Typography, TextField, Chip } from '@mui/material';
import { StepItem } from '@/components/portal/onboarding/StepItem';
import { SkillTag } from '@/components/portal/onboarding/SkillTag';

const steps = [
  { number: 1, title: 'Headshot', isActive: false },
  { number: 2, title: 'Skills', isActive: true },
  { number: 3, title: 'Payment', isActive: false },
  { number: 4, title: 'Attributes', isActive: false },
  { number: 5, title: 'Social', isActive: false },
  { number: 6, title: 'ID', isActive: false },
  { number: 7, title: 'Portfolio', isActive: false },
  { number: 8, title: 'Review', isActive: false }
];

const skills = [
  { name: 'Acting' },
  { name: 'Modeling' },
  { name: 'Dancing' }
];

const SkillsSelection: React.FC = () => {
  return (
    <Box className="flex overflow-hidden flex-col bg-white rounded-lg border-2 border-gray-300">
      <Box className="flex flex-col w-full bg-black pb-[786px] max-md:pb-24">
        <Box className="flex flex-wrap gap-5 justify-between items-start px-6 pt-6 pb-1 w-full text-2xl font-bold text-orange-300">
          <Typography variant="h5" sx={{ py: 1 }}>
            Staffing Solutions Hub
          </Typography>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/4c66051b285ead94661ffa47c24a7791f2cf864c1156cb4f4acc8c3b2b6847fe?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt=""
            style={{ objectFit: 'contain', width: '18px' }}
          />
        </Box>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/04941e81747f3ecb6811e1684b15614793214440d6dff851abf37ed98ca1961c?apiKey=7fae980a988640eea8add1e49a5d542e&"
          alt=""
          style={{ objectFit: 'contain', width: '121px', marginTop: '-40px', marginLeft: '128px' }}
        />
        <Box className="flex z-10 flex-col items-center px-16 mt-0 w-full text-white">
          <Box className="flex gap-5 justify-between items-start pl-3.5 ml-6 max-w-full">
            {steps.map((step) => (
              <StepItem key={step.number} {...step} />
            ))}
          </Box>
        </Box>
        <Box className="flex flex-col items-center self-end px-20 pt-16 mt-9 mr-11 w-full text-base max-w-[1248px]">
          <Box 
            className="flex flex-col px-8 pt-8 pb-14 max-w-full rounded-xl"
            sx={{ backgroundColor: 'rgba(75, 85, 99, 0.1)' }} // Stone-500 with 10% opacity
          >
            <Typography variant="h5" sx={{ pt: 1, pb: 3, color: 'orange' }}>
              Professional Skills
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Add your skills..."
              sx={{
                backgroundColor: 'black',
                borderColor: '#4B5563', // Stone-500
                color: 'gray',
                '& .MuiOutlinedInput-input': {
                  padding: '16px 16px'
                }
              }}
            />
            <Box className="flex flex-wrap gap-2 mt-6 pr-20">
              {skills.map((skill) => (
                <SkillTag key={skill.name} {...skill} />
              ))}
            </Box>
          </Box>
        </Box>
        <Typography variant="caption" sx={{ px: 16, py: 7, mt: 24, mb: 0, ml: 5, color: 'gray', textAlign: 'center' }}>
          Step 2 of 8 - Skills
        </Typography>
      </Box>
    </Box>
  );
};

export default SkillsSelection;