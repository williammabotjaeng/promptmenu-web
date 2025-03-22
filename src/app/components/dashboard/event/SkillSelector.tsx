import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import useEventStore from '@/state/use-event-store';
import { useStore } from 'zustand';
import { EventRepeatOutlined } from '@mui/icons-material';

const skills = [
  { name: "Event Coordination" },
  { name: "Project Management" },
  { name: "Modeling" },
  { name: "Event Executive" },
  { name: "Ushering" },
  { name: "Freelancing" },
  { name: "Photography" },
  { name: "Influencer Marketing" },
  { name: "Sports Modeling" },
  { name: "Security Management" },
  { name: "Hosting" },
  { name: "Videography" },
  { name: "Event Management" },
  { name: "Event Organization" },
  { name: "Site Management" },
  { name: "Journalism" },
  { name: "Dancer" }
];

const SkillSelector = () => {
  const { eventRole, setEventRole } = useStore(useEventStore);

  const [selectedSkill, setSelectedSkill] = useState(eventRole?.skill || '');

  const handleSkillChange = (val: any) => {
    console.log("Skill Value:", val?.target?.value);
    setSelectedSkill(val?.target?.value);
    setEventRole({
        ...eventRole,
        skill: val?.target?.value
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        px: 1,
        py: 1,
        mt: 1,
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: 'gray.300',
      }}
    >
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="skill-select-label">Skill</InputLabel>
        <Select
          labelId="skill-select-label"
          value={selectedSkill}
          onChange={handleSkillChange}
          label="Skill"
        >
          {skills.map((skill, index) => (
            <MenuItem key={index} value={skill.name}>
              {skill.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SkillSelector;