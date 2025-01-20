"use client";

import * as React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';
import { StepItem } from '@/components/portal/onboarding/StepItem';
import { DocumentItem } from '@/components/portal/onboarding/DocumentItem';
import { SocialMediaLink } from '@/components/portal/onboarding/SocialMediaLink';
import { AttributeCard } from '@/components/portal/onboarding/AttributeCard';
import { SkillBadge } from '@/components/portal/onboarding/SkillBadge';

const steps = [
  { number: 1, title: 'Headshot' },
  { number: 2, title: 'Skills' },
  { number: 3, title: 'Payment' },
  { number: 4, title: 'Attributes' },
  { number: 5, title: 'Social' },
  { number: 6, title: 'ID' },
  { number: 7, title: 'Portfolio' },
  { number: 8, title: 'Review', isActive: true }
];

const skills = ['Acting', 'Modeling', 'Dancing', 'Singing'];

const attributes = [
  { label: 'Height', value: '175 cm' },
  { label: 'Weight', value: '65 kg' },
  { label: 'Hair Color', value: 'Brown' },
  { label: 'Eye Color', value: 'Blue' }
];

const socialLinks = [
  { icon: 'instagram', username: '@talentname' },
  { icon: 'tiktok', username: '@talentname' }
];

const documents = [
  { title: 'Acting_Resume.pdf', date: 'Updated Jan 20, 2025' },
  { title: 'Portfolio_2025.pdf', date: 'Updated Jan 22, 2025' }
];

export const ProfileReview: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: '8px', backgroundColor: 'white' }}>
      {steps.map((step) => (
                  <StepItem
                    key={step.number}
                    number={step.number}
                    title={step.title}
                    isActive={step.isActive}
                  />
      ))}
      <Divider sx={{ marginY: 2 }} />

      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Skills
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginBottom: 2 }}>
        {skills.map((skill) => (
          <SkillBadge key={skill} name={skill} />
        ))}
      </Box>

      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Attributes
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 2 }}>
        {attributes.map((attr) => (
          <AttributeCard key={attr.label} label={attr.label} value={attr.value} />
        ))}
      </Box>

      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Social Media Links
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', marginBottom: 2 }}>
        {socialLinks.map((link) => (
          <SocialMediaLink key={link.username} icon={link.icon} username={link.username} />
        ))}
      </Box>

      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Documents
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        {documents.map((doc) => (
          <DocumentItem key={doc.title} icon={doc.icon} title={doc.title} date={doc.date} />
        ))}
      </Box>
    </Paper>
  );
};