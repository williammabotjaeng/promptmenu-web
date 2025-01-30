import * as React from 'react';
import { Box, Typography, IconButton, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SkillTagProps } from '@/types/Props/SkillTagProps';

export const SkillTag: React.FC<SkillTagProps> = ({ skill, handleSkillClick, selectedSkills }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '20px',
        border: '1px solid #CEAB76',
        color: 'white',
        backgroundColor: '#977342'
      }}
    >
      <Chip
        label={skill?.name}
        onClick={() => handleSkillClick(skill)}
        variant={selectedSkills.some(selectedSkill => selectedSkill?.name === skill?.name) ? 'filled' : 'outlined'}
        sx={{
          cursor: 'pointer',
          backgroundColor: selectedSkills.some(selectedSkill => selectedSkill?.name === skill?.name) ? 'transparent' : '#000',
          color: selectedSkills.some(selectedSkill => selectedSkill?.name === skill?.name) ? '#fff' : '#CEAB76',
          '&:hover': {
            backgroundColor: selectedSkills.some(selectedSkill => selectedSkill?.name === skill?.name) ? '#333' : '#f0f0f0',
          },
        }}
      />
    </Box>
  );
};