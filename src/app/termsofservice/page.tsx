"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Breadcrumbs,
  Link as MuiLink,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { 
  MenuBook,
  ArrowRight,
  Gavel,
  CheckCircle,
  Cancel,
  Warning,
  Info
} from '@mui/icons-material';
import Link from 'next/link';

export default function TermsOfService() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add animation effect on mount
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleHome = () => {
    router.push("/");
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e0f2f1 100%)',
      }}
    >
      {/* Header Bar */}
      <Box 
        sx={{
          py: 2, 
          px: 4, 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255,255,255,0.8)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MenuBook sx={{ color: '#107C10', fontSize: 32 }} />
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700, 
              background: 'linear-gradient(90deg, #107C10, #0078D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              cursor: 'pointer'
            }}
            onClick={handleHome}
          >
            PromptMenu
          </Typography>
        </Box>
        <Box>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#555', 
              display: 'flex', 
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
              <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
              <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
              <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
            </svg>
            Powered by Azure AI
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          flex: 1,
          py: 4,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box 
          sx={{
            opacity: isLoading ? 0 : 1,
            transform: isLoading ? 'translateY(20px)' : 'translateY(0)',
            transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
          }}
        >
          {/* Breadcrumbs */}
          <Breadcrumbs sx={{ mb: 4 }}>
            <Link href="/" passHref>
              <MuiLink
                sx={{
                  color: '#0078D4',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Home
              </MuiLink>
            </Link>
            <Typography color="text.primary">Terms of Service</Typography>
          </Breadcrumbs>

          <Paper
            elevation={2}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Gavel sx={{ color: '#107C10', fontSize: 32, mr: 2 }} />
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                Terms of Service
              </Typography>
            </Box>

            <Typography variant="subtitle1" sx={{ mb: 3, color: 'text.secondary' }}>
              Last Updated: March 27, 2025
            </Typography>

            <Box sx={{ mb: 5 }}>
              <Typography variant="body1" paragraph>
                Welcome to PromptMenu. These Terms of Service ("Terms") govern your access to and use of our digital menu platform, 
                including our website, mobile applications, and all services provided through them (collectively, the "Service"). 
                By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy.
              </Typography>
              <Typography variant="body1" paragraph>
                Please read these Terms carefully before using our Service. If you do not agree to these Terms, you may not access or use the Service.
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600, color: '#107C10' }}>
                1. Account Registration
              </Typography>
              <Typography variant="body1" paragraph>
                To use certain features of the Service, you may need to register for an account. When you register, you agree to provide accurate, 
                current, and complete information about yourself as prompted by the registration form.
              </Typography>
              <Typography variant="body1" paragraph>
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. 
                You agree to immediately notify us of any unauthorized use of your account or any other breach of security.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600, color: '#107C10' }}>
                2. Restaurant Information
              </Typography>
              <Typography variant="body1" paragraph>
                As a restaurant owner or manager using our Service, you are responsible for providing accurate and up-to-date information about your 
                restaurant, including menu items, prices, ingredients, allergens, and any other relevant details. You agree not to misrepresent 
                your restaurant or menu offerings.
              </Typography>
              <Typography variant="body1" paragraph>
                You understand that diners may rely on the information you provide through our Service to make dining decisions, including those 
                related to food allergies and dietary restrictions. You are solely responsible for the accuracy of this information.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600, color: '#107C10' }}>
                3. Intellectual Property
              </Typography>
              <Typography variant="body1" paragraph>
                The Service and its original content, features, and functionality are owned by PromptMenu and are protected by 
                international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </Typography>
              <Typography variant="body1" paragraph>
                By uploading or sharing content through our Service (such as restaurant photos, menu descriptions, or videos), you grant 
                PromptMenu a non-exclusive, royalty-free, worldwide license to use, reproduce, modify, adapt, publish, translate, and distribute 
                such content in connection with providing and promoting the Service.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600, color: '#107C10' }}>
                4. Prohibited Uses
              </Typography>
              <Typography variant="body1" paragraph>
                You agree not to use the Service:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Cancel sx={{ color: '#d32f2f' }} />
                  </ListItemIcon>
                  <ListItemText primary="In any way that violates any applicable federal, state, local, or international law or regulation" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Cancel sx={{ color: '#d32f2f' }} />
                  </ListItemIcon>
                  <ListItemText primary="To transmit any material that is defamatory, obscene, indecent, abusive, offensive, harassing, violent, hateful, inflammatory, or otherwise objectionable" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Cancel sx={{ color: '#d32f2f' }} />
                  </ListItemIcon>
                  <ListItemText primary="To impersonate or attempt to impersonate PromptMenu, a PromptMenu employee, another user, or any other person or entity" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Cancel sx={{ color: '#d32f2f' }} />
                  </ListItemIcon>
                  <ListItemText primary="To engage in any activity that interferes with or disrupts the Service (or the servers and networks connected to the Service)" />
                </ListItem>
              </List>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600, color: '#107C10' }}>
                5. Payment Terms
              </Typography>
              <Typography variant="body1" paragraph>
                Some features of our Service require payment of fees. All fees are stated in US dollars and do not include taxes, which are your responsibility.
              </Typography>
              <Typography variant="body1" paragraph>
                You agree to provide accurate and complete billing information, including legal name, address, telephone number, and payment method details. 
                You authorize us to charge your chosen payment method for all fees incurred.
              </Typography>
              <Typography variant="body1" paragraph>
                Subscription fees are billed in advance on a monthly or annual basis, depending on the subscription plan selected. Subscription periods 
                begin on the date of your initial subscription purchase and renew automatically until terminated.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600, color: '#107C10' }}>
                6. Termination
              </Typography>
              <Typography variant="body1" paragraph>
                We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, 
                including, without limitation, if you breach these Terms.
              </Typography>
              <Typography variant="body1" paragraph>
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply 
                discontinue using the Service or contact us to request account deletion.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600, color: '#107C10' }}>
                7. Limitation of Liability
              </Typography>
              <Typography variant="body1" paragraph>
                To the maximum extent permitted by law, in no event shall PromptMenu, its directors, employees, partners, agents, suppliers, 
                or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, 
                loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Info sx={{ color: '#0078D4' }} />
                  </ListItemIcon>
                  <ListItemText primary="Your access to or use of or inability to access or use the Service" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info sx={{ color: '#0078D4' }} />
                  </ListItemIcon>
                  <ListItemText primary="Any conduct or content of any third party on the Service" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info sx={{ color: '#0078D4' }} />
                  </ListItemIcon>
                  <ListItemText primary="Any content obtained from the Service" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info sx={{ color: '#0078D4' }} />
                  </ListItemIcon>
                  <ListItemText primary="Unauthorized access, use, or alteration of your transmissions or content" />
                </ListItem>
              </List>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600, color: '#107C10' }}>
                8. Changes to Terms
              </Typography>
              <Typography variant="body1" paragraph>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by 
                posting the new Terms on this page and updating the "Last Updated" date.
              </Typography>
              <Typography variant="body1" paragraph>
                Your continued use of the Service after any such changes constitutes your acceptance of the new Terms. If you do not agree to the 
                new terms, please stop using the Service.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600, color: '#107C10' }}>
                9. Contact Us
              </Typography>
              <Typography variant="body1" paragraph>
                If you have any questions about these Terms, please contact us at:
              </Typography>
              <Typography variant="body1" sx={{ pl: 2, borderLeft: '4px solid #107C10', mb: 2 }}>
                <strong>Email:</strong> legal@promptmenu.com<br />
                <strong>Address:</strong> PromptMenu, Inc.<br />
                123 Digital Lane<br />
                Seattle, WA 98101<br />
                United States
              </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                By using PromptMenu's services, you acknowledge that you have read, understood, and agree to these Terms of Service.
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                Thank you for choosing PromptMenu for your digital menu needs.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>

      {/* Footer */}
      <Box 
        sx={{ 
          py: 2, 
          textAlign: 'center', 
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255,255,255,0.8)',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} PromptMenu — Transform your restaurant experience with digital menus
        </Typography>
      </Box>
    </Box>
  );
};
