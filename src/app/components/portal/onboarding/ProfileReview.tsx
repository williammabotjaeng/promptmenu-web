"use client";

import * as React from 'react';
import { Box, Paper, Typography, Divider, Button } from '@mui/material';
import { StepItem } from '@/components/portal/onboarding/StepItem';
import { DocumentItem } from '@/components/portal/onboarding/DocumentItem';
import { SocialMediaLink } from '@/components/portal/onboarding/SocialMediaLink';
import { AttributeCard } from '@/components/portal/onboarding/AttributeCard';
import { SkillBadge } from '@/components/portal/onboarding/SkillBadge';
import OnboardingHeader from '@/components/portal/onboarding/OnboardingHeader';
import { useRouter } from 'next/navigation';
import { OnboardingStepProps } from '@/types/Props/OnboardingStepProps';
import Image from 'next/image';
import Headshot from '@/assets/headshot.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import RevImageOne from '@/assets/review_image_one.png';
import RevImageTwo from '@/assets/review_image_two.png';
import RevImageThree from '@/assets/review_image_three.png';
import { useStore } from 'zustand';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';

const steps = [
  { number: 1, title: 'Headshot', isActive: false },
  { number: 2, title: 'Skills', isActive: false },
  { number: 3, title: 'Payment', isActive: false },
  { number: 4, title: 'Attributes', isActive: false },
  { number: 5, title: 'Social', isActive: false },
  { number: 6, title: 'ID', isActive: false },
  { number: 7, title: 'Portfolio', isActive: false },
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

const idDocs = [
  { title: 'ID_Doc_front.pdf', date: 'Updated Jan 20, 2025' },
  { title: 'ID_Doc_back.pdf', date: 'Updated Jan 20, 2025' }
];

export const ProfileReview: React.FC<OnboardingStepProps> = ({ activeStep, setActiveStep }) => {

  const { talentData, paymentMethods } = useStore(useTalentOnboardingStore);

  const router = useRouter();

  const onClose = () => {
    router.push('/portal');
  };

  const handleContinue = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Box sx={{
      backgroundColor: 'black',
      justifyContent: 'center',
      overflow: 'hidden',
      alignItems: 'center',
      color: '#CEAB76',
      width: '100%',
      paddingX: { xs: 2, md: 4 },
      boxSizing: 'border-box'
    }}>
      {/* Header Section */}
      <OnboardingHeader steps={steps} onClose={onClose} />
      <Typography sx={{ fontSize: '30px', color: '#977342', fontWeight: 'bold', textAlign: 'center', width: '100%' }}>
        Review Your Profile
      </Typography>

      <Box sx={{ padding: { xs: 1, md: 4 } }}>
        <Typography sx={{ fontSize: '20px', fontWeight: 'semi-bold', mb: 1, textAlign: { xs: 'center' } }}>Headshot</Typography>

        <Box sx={{ display: 'flex', alignItems: { xs: 'center' }, justifyContent: { xs: 'center' }, flexDirection: { xs: 'column', md: 'row' } }}>
          <Image
            src={talentData?.headshot || ''}
            width={200}
            height={210}
            alt="headshot-example"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: { xs: 1, md: 4 } }}>
            <Typography sx={{ fontSize: '16px', color: '#4B5563' }}>Primary Headshot</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ padding: 4 }}>
        <Typography variant="h6" sx={{ marginBottom: 2, fontSize: { xs: '18px', md: '20px' }, fontWeight: 'semi-bold' }}>
          Skills
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginBottom: 2 }}>
          {talentData?.skills.map((skill) => (
            <SkillBadge key={skill?.name} name={skill?.name} />
          ))}
        </Box>

        <Typography variant="h6" sx={{ marginBottom: 2, fontSize: { xs: '18px', md: '20px' }, color: '#977342', fontWeight: 'semi-bold' }}>
          Payment Details
        </Typography>
        {paymentMethods?.ccNumber && (
          <Box sx={{ bgcolor: 'white', padding: { xs: 2, md: 3 }, borderRadius: '4px', marginBottom: 2, boxShadow: 1 }}>
            <Typography sx={{ color: '#6B7280', fontSize: { xs: '14px', md: '16px' } }}>Credit Card: **** **** **** {paymentMethods?.ccNumber?.slice(-4)}</Typography>
            <Typography sx={{ color: '#6B7280', fontSize: { xs: '14px', md: '16px' } }}>Expires: {paymentMethods?.ccExpiry}</Typography>
          </Box>)}

        {paymentMethods?.paypalEmail && (
          <Box sx={{ bgcolor: 'white', padding: { xs: 2, md: 3 }, borderRadius: '4px', marginBottom: 2, boxShadow: 1 }}>
            <Typography sx={{ color: '#6B7280', fontSize: { xs: '14px', md: '16px' } }}>Paypal Email:</Typography>
            <Typography sx={{ color: '#6B7280', fontSize: { xs: '14px', md: '16px' } }}>Expires: {paymentMethods?.paypalEmail}</Typography>
          </Box>)}

        {paymentMethods?.accountNumber && (
          <Box sx={{ bgcolor: 'white', padding: { xs: 2, md: 3 }, borderRadius: '4px', marginBottom: 2, boxShadow: 1 }}>
            <Typography sx={{ color: '#6B7280', fontSize: { xs: '14px', md: '16px' } }}>Banking Details: </Typography>
            <Typography sx={{ color: '#6B7280', fontSize: { xs: '14px', md: '16px' } }}>Account No.: {paymentMethods?.accountNumber}</Typography>
            <Typography sx={{ color: '#6B7280', fontSize: { xs: '14px', md: '16px' } }}>Bank Name: {paymentMethods?.bankName}</Typography>
          </Box>)}

        <Typography variant="h6" sx={{ marginBottom: 2, fontSize: { xs: '18px', md: '20px' }, fontWeight: 'semi-bold' }}>
          Attributes
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 2, width: { xs: '100%' } }}>
          <AttributeCard key={'Height'} label={"Height"} value={String(talentData?.height)} />
          <AttributeCard key={'Weight'} label={"Weight"} value={String(talentData?.weight)} />
          <AttributeCard key={'Eye Color'} label={"Eye Color"} value={talentData?.eyeColor} />
          <AttributeCard key={'Hair Color'} label={"Hair Color"} value={talentData?.hairColor} />
        </Box>

        <Typography variant="h6" sx={{ marginBottom: 2, fontSize: '20px', fontWeight: 'semi-bold' }}>
          ID Document
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', marginBottom: 2 }}>
          {idDocs.map((doc) => (
            <DocumentItem key={doc.title} title={doc.title} date={doc.date} />
          ))}
        </Box>

        <Typography variant="h6" sx={{ marginBottom: 2, fontSize: '20px', fontWeight: 'semi-bold', textAlign: { xs: 'center' } }}>
          Social Media Links
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', marginBottom: 2 }}>
          {socialLinks.map((link, index) => (
            <SocialMediaLink key={index} icon={link.icon} username={link.username} />
          ))}
        </Box>

        <Typography variant="h6" sx={{ marginBottom: 2, fontSize: '20px', fontWeight: 'semi-bold', textAlign: { xs: 'center' } }}>
          Photos
        </Typography>
        <Box sx={{ display: { xs: 'flex', md: 'flex' }, flexDirection: { xs: 'column', md: 'row' }, gap: 2, marginBottom: 2, justifyContent: { xs: 'center' }, alignItems: { xs: 'center' } }}>
          <Image src={talentData?.additional_images[0]} width={250} height={250} alt="Photo 1" />
          <Image src={talentData?.additional_images[1]} width={250} height={250} alt="Photo 2" />
          <Image src={talentData?.additional_images[2]} width={250} height={250} alt="Photo 3" />
        </Box>

        <Typography variant="h6" sx={{ marginBottom: 2, fontSize: '20px', fontWeight: 'semi-bold', textAlign: { xs: 'center' } }}>
          Video Showreel
        </Typography>
        <Box
          sx={{
            position: 'relative',
            borderRadius: '4px',
            height: { xs: '200px', md: '400px' },
            marginBottom: 2,
            overflow: 'hidden', // Ensures the video doesn't overflow the box
          }}
        >
          {/* Video Background */}
          <video
            src={String(talentData?.portfolio_video?.file)}
            autoPlay
            loop
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1, 
            }}
          ></video>

          {/* Overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.5)', 
              zIndex: 2, 
            }}
          ></Box>

          {/* Play Icon */}
          <PlayCircleOutlineIcon
            sx={{
              color: '#977342',
              fontSize: { xs: '150px', md: '50px' },
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)', 
              zIndex: 3, 
            }}
          />
        </Box>

        <Typography variant="h6" sx={{ marginBottom: 2, fontSize: '20px', fontWeight: 'semi-bold' }}>
          Documents
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', marginBottom: 2 }}>
          {documents.map((doc) => (
            <DocumentItem key={doc.title} title={doc.title} date={doc.date} />
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', marginTop: { md: 4 }, width: '95%', ml: { md: 4 } }}>
        <Button
          sx={{ color: '#977342', border: '1px solid #977342', backgroundColor: '#000', mt: { xs: 2 }, '&:hover': { color: 'white' } }}
          onClick={handleBack}
        >
          Go Back
        </Button>
        <Button
          sx={{ color: '#fff', backgroundColor: '#977342', mt: { xs: 1 }, mb: { xs: 2 } }}
          onClick={handleContinue}
        >
          Submit for Review
        </Button>
      </Box>
    </Box>
  );
};