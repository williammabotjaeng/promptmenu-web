import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  ListSubheader,
  Chip,
  useTheme,
  styled
} from '@mui/material';
import useEventStore from '@/state/use-event-store';
import { useStore } from 'zustand';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

// Custom styled subheader that can be sticky and hidden
const StyledSubheader = styled(ListSubheader)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 1,
  backgroundColor: 'white',
  '&.hidden': {
    display: 'none'
  }
}));

// Organized skills by category and sorted alphabetically
const skillCategories = {
  main: [
    { name: "Dancer" },
    { name: "Event Coordination" },
    { name: "Event Executive" },
    { name: "Event Management" },
    { name: "Event Organization" },
    { name: "Freelancing" },
    { name: "Hosting" },
    { name: "Influencer Marketing" },
    { name: "Journalism" },
    { name: "Modeling" },
    { name: "Photography" },
    { name: "Project Management" },
    { name: "Security Management" },
    { name: "Site Management" },
    { name: "Sports Modeling" },
    { name: "Ushering" },
    { name: "Videography" }
  ].sort((a, b) => a.name.localeCompare(b.name)),
  
  kidsEntertainment: [
    { name: "Balloon Artist" },
    { name: "Character Performer" },
    { name: "Clown" },
    { name: "Face Painter" },
    { name: "Kids Party Host" },
    { name: "Magician" },
    { name: "Puppet Show Host" },
    { name: "Storyteller" }
  ].sort((a, b) => a.name.localeCompare(b.name))
};

const SkillSelector = () => {
  const theme = useTheme();
  const { eventRole, setEventRole } = useStore(useEventStore);
  
  const [selectedSkill, setSelectedSkill] = useState(eventRole?.skill || '');
  const [isKidsCategoryVisible, setIsKidsCategoryVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Reference to track when the menu opens
  const menuRef = useRef(null);
  
  const handleSkillChange = (val: any) => {
    console.log("Skill Value:", val?.target?.value);
    setSelectedSkill(val?.target?.value);
    setEventRole({
      ...eventRole,
      skill: val?.target?.value
    });
  };

  // Get category by skill name
  const getSkillCategory = (skillName: string): string => {
    if (skillCategories.main.some(skill => skill.name === skillName)) {
      return 'main';
    } else if (skillCategories.kidsEntertainment.some(skill => skill.name === skillName)) {
      return 'kidsEntertainment';
    }
    return '';
  };

  // Setup intersection observer to detect when Kids category becomes visible
  useEffect(() => {
    if (menuOpen) {
      // Use setTimeout to allow the menu to render first
      setTimeout(() => {
        const kidsHeader = document.querySelector('[data-category="kids"]');
        if (kidsHeader) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              // When Kids category intersects with viewport, hide Main category
              setIsKidsCategoryVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
          );
          
          observer.observe(kidsHeader);
          
          return () => {
            observer.disconnect();
          };
        }
      }, 100);
    }
  }, [menuOpen]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        px: 2,
        py: 2,
        mt: 1,
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.12)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Typography 
        variant="subtitle1" 
        sx={{ 
          fontWeight: 600,
          mb: 1.5
        }}
      >
        Select Role Skill
      </Typography>
      
      <FormControl fullWidth>
        <InputLabel id="skill-select-label">Skill</InputLabel>
        <Select
          labelId="skill-select-label"
          value={selectedSkill}
          onChange={handleSkillChange}
          label="Skill"
          ref={menuRef}
          onOpen={() => setMenuOpen(true)}
          onClose={() => setMenuOpen(false)}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300
              }
            }
          }}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {getSkillCategory(selected) === 'kidsEntertainment' ? (
                <ChildCareIcon 
                  fontSize="small" 
                  sx={{ 
                    mr: 1, 
                    color: theme.palette.primary.main 
                  }} 
                />
              ) : (
                <WorkOutlineIcon 
                  fontSize="small" 
                  sx={{ 
                    mr: 1, 
                    color: theme.palette.primary.main 
                  }} 
                />
              )}
              {selected}
            </Box>
          )}
        >
          <StyledSubheader 
            className={isKidsCategoryVisible ? 'hidden' : ''}
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              fontWeight: 600,
              color: theme.palette.primary.main,
              bgcolor: 'rgba(0, 0, 0, 0.03)'
            }}
            data-category="main"
          >
            <WorkOutlineIcon fontSize="small" sx={{ mr: 1 }} />
            Main Skills
          </StyledSubheader>
          
          {skillCategories.main.map((skill, index) => (
            <MenuItem key={`main-${index}`} value={skill.name}>
              {skill.name}
            </MenuItem>
          ))}
          
          <StyledSubheader 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              fontWeight: 600,
              color: theme.palette.primary.main,
              bgcolor: 'rgba(0, 0, 0, 0.03)',
              mt: 1
            }}
            data-category="kids"
          >
            <ChildCareIcon fontSize="small" sx={{ mr: 1 }} />
            Kids Entertainment
          </StyledSubheader>
          
          {skillCategories.kidsEntertainment.map((skill, index) => (
            <MenuItem key={`kids-${index}`} value={skill.name}>
              {skill.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedSkill && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Selected Skill:
          </Typography>
          <Chip 
            label={selectedSkill}
            color={getSkillCategory(selectedSkill) === 'kidsEntertainment' ? 'secondary' : 'primary'}
            icon={getSkillCategory(selectedSkill) === 'kidsEntertainment' ? <ChildCareIcon /> : <WorkOutlineIcon />}
            variant="outlined"
            sx={{ borderRadius: '4px' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default SkillSelector;