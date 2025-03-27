"use client";

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Divider, 
  Stack,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { 
  CheckCircleOutline, 
  Cancel, 
  ExpandMore, 
  Restaurant, 
  LocalOffer, 
  Videocam,
  Translate, 
  Analytics,
  QueryStats,
  ReceiptLong,
  HelpOutline
} from '@mui/icons-material';
import Link from 'next/link';

// Microsoft-inspired color scheme
const theme = {
  colors: {
    primary: "#107C10", // Microsoft green
    secondary: "#0078D4", // Microsoft blue
    accent: "#50E6FF", // Azure blue
    lightGreen: "#84c680",
    lightBlue: "#a8d1f0",
    background: "#f5f5f5",
    text: "#323130",
    lightText: "#605E5C",
    white: "#FFFFFF",
  },
};

const PricingPage: React.FC = () => {
  const [annualBilling, setAnnualBilling] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState<string | false>(false);

  const handleFaqChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedFaq(isExpanded ? panel : false);
  };

  const pricingTiers = [
    {
      name: "Free",
      monthlyPrice: 0,
      annualPrice: 0,
      description: "Basic digital menu for small restaurants",
      highlight: false,
      color: 'rgba(0,0,0,0.07)',
      features: [
        { name: "Digital menu creation", included: true },
        { name: "Basic QR code generation", included: true },
        { name: "Up to 25 menu items", included: true },
        { name: "Single image per item", included: true },
        { name: "Basic analytics", included: true },
        { name: "Video integration", included: false },
        { name: "AI translation", included: false },
        { name: "Advanced analytics", included: false },
        { name: "Custom branding", included: false },
        { name: "Priority support", included: false },
      ],
      cta: "Get Started Free",
      ctaLink: "/register/restaurant"
    },
    {
      name: "Standard",
      monthlyPrice: 49,
      annualPrice: 39,
      description: "Video integration and enhanced analytics",
      highlight: true,
      color: theme.colors.primary,
      badge: "MOST POPULAR",
      features: [
        { name: "Digital menu creation", included: true },
        { name: "Custom QR code generation", included: true },
        { name: "Unlimited menu items", included: true },
        { name: "Multiple images per item", included: true },
        { name: "Enhanced analytics", included: true },
        { name: "Video integration", included: true },
        { name: "Basic AI translation (5 languages)", included: true },
        { name: "Advanced analytics", included: false },
        { name: "Custom branding", included: true },
        { name: "Priority support", included: false },
      ],
      cta: "Choose Standard",
      ctaLink: "/register/restaurant?plan=standard"
    },
    {
      name: "Premium",
      monthlyPrice: 99,
      annualPrice: 79,
      description: "Full AI suite including translation & inventory",
      highlight: false,
      color: theme.colors.secondary,
      features: [
        { name: "Digital menu creation", included: true },
        { name: "Custom QR code generation", included: true },
        { name: "Unlimited menu items", included: true },
        { name: "Multiple images per item", included: true },
        { name: "Enhanced analytics", included: true },
        { name: "Video integration", included: true },
        { name: "Full AI translation (15+ languages)", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Custom branding", included: true },
        { name: "Priority support", included: true },
      ],
      cta: "Choose Premium",
      ctaLink: "/register/restaurant?plan=premium"
    }
  ];

  const faqs = [
    {
      question: "Can I switch plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the new pricing will be prorated for the remainder of your billing cycle. If you downgrade, the new pricing will take effect at the start of your next billing cycle."
    },
    {
      question: "Is there a contract or commitment?",
      answer: "No long-term contract is required. For monthly plans, you pay month-to-month and can cancel anytime. Annual plans are paid up front for the year and provide a 20% discount compared to monthly billing."
    },
    {
      question: "How does the AI translation work?",
      answer: "Our AI translation is powered by Azure AI services and supports automatic menu translation for international customers. The Standard plan includes 5 languages, while the Premium plan supports 15+ languages with more advanced contextual translation capabilities."
    },
    {
      question: "Do you offer custom solutions for large restaurant chains?",
      answer: "Yes, we offer custom enterprise solutions for restaurant chains with multiple locations. Our enterprise plans include dedicated support, custom branding, API access, and more. Please contact our sales team to discuss your specific requirements."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. For annual enterprise plans, we can also accommodate invoicing and bank transfers."
    },
    {
      question: "Is there a setup fee?",
      answer: "No, there are no setup fees for any of our plans. You only pay the advertised price for your chosen plan, and you can get started immediately after signing up."
    }
  ];

  const featureComparison = [
    { 
      category: "Menu Creation",
      features: [
        { name: "Menu items", free: "Up to 25", standard: "Unlimited", premium: "Unlimited" },
        { name: "Categories", free: "Up to 5", standard: "Unlimited", premium: "Unlimited" },
        { name: "Images per item", free: "1", standard: "Up to 5", premium: "Unlimited" },
        { name: "Custom descriptions", free: "Basic", standard: "Enhanced", premium: "Enhanced" },
      ]
    },
    {
      category: "Media",
      features: [
        { name: "Video integration", free: "❌", standard: "✓", premium: "✓" },
        { name: "Video storage", free: "❌", standard: "10GB", premium: "50GB" },
        { name: "Chef introductions", free: "❌", standard: "✓", premium: "✓" },
        { name: "Preparation videos", free: "❌", standard: "✓", premium: "✓" },
      ]
    },
    {
      category: "AI Features",
      features: [
        { name: "AI translation", free: "❌", standard: "5 languages", premium: "15+ languages" },
        { name: "Menu suggestions", free: "❌", standard: "❌", premium: "✓" },
        { name: "Customer insights", free: "Basic", standard: "Advanced", premium: "Premium" },
        { name: "Voice ordering", free: "❌", standard: "❌", premium: "✓" },
      ]
    },
    {
      category: "Support",
      features: [
        { name: "Customer support", free: "Email", standard: "Email & Chat", premium: "Email, Chat & Phone" },
        { name: "Response time", free: "48 hours", standard: "24 hours", premium: "4 hours" },
        { name: "Onboarding", free: "Self-serve", standard: "Guided setup", premium: "Dedicated onboarding" },
        { name: "Training", free: "Documentation", standard: "Webinars", premium: "Custom training" },
      ]
    }
  ];

  return (
    <Box sx={{ 
      bgcolor: theme.colors.background,
      minHeight: '100vh',
     }}>
      {/* Header section */}
      <Box sx={{ 
        py: 8, 
        textAlign: 'center',
        background: `linear-gradient(135deg, ${theme.colors.secondary}20, ${theme.colors.primary}20)`,
      }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2, color: theme.colors.text }}>
            Simple, Transparent Pricing
          </Typography>
          <Typography variant="h5" component="p" sx={{ maxWidth: 700, mx: 'auto', mb: 4, color: theme.colors.lightText }}>
            Choose the plan that helps your restaurant <strong>TIP</strong> into the digital menu revolution
          </Typography>
          
          <FormControlLabel
            control={
              <Switch 
                checked={annualBilling}
                onChange={() => setAnnualBilling(!annualBilling)}
                color="primary"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                Annual billing 
                <Chip 
                  label="Save 20%" 
                  size="small" 
                  sx={{ 
                    ml: 1, 
                    bgcolor: theme.colors.primary, 
                    color: 'white',
                    fontWeight: 500 
                  }} 
                />
              </Box>
            }
          />
        </Container>
      </Box>

      {/* Pricing tiers */}
      <Container maxWidth="lg" sx={{ mt: -4, mb: 8, position: 'relative', zIndex: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          alignItems: 'stretch'
        }}>
          {pricingTiers.map((tier, index) => (
            <Paper 
              key={tier.name} 
              elevation={tier.highlight ? 8 : 1} 
              sx={{ 
                flex: 1,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                borderTop: tier.highlight ? `5px solid ${tier.color}` : 'none',
                transform: tier.highlight ? { md: 'scale(1.05)' } : 'none',
                zIndex: tier.highlight ? 2 : 1,
                bgcolor: tier.highlight ? 'white' : theme.colors.white,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: { xs: 'none', md: tier.highlight ? 'scale(1.07)' : 'scale(1.02)' },
                  boxShadow: tier.highlight ? '0 8px 40px rgba(0,0,0,0.1)' : '0 4px 20px rgba(0,0,0,0.1)'
                }
              }}
            >
              {tier.badge && (
                <Chip
                  label={tier.badge}
                  sx={{
                    position: 'absolute',
                    top: -14,
                    right: 20,
                    bgcolor: tier.color,
                    color: 'white',
                    fontWeight: 600
                  }}
                />
              )}
              
              <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1, color: tier.color !== 'rgba(0,0,0,0.07)' ? tier.color : theme.colors.text }}>
                {tier.name}
              </Typography>
              
              <Typography variant="body2" sx={{ color: theme.colors.lightText, mb: 3, minHeight: 42 }}>
                {tier.description}
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 1 }}>
                  <Typography variant="h3" component="span" sx={{ fontWeight: 700, lineHeight: 1, color: theme.colors.text }}>
                    ${annualBilling ? tier.annualPrice : tier.monthlyPrice}
                  </Typography>
                  <Typography variant="body1" component="span" sx={{ ml: 1, mb: 0.5, color: theme.colors.lightText }}>
                    /month
                  </Typography>
                </Box>
                {annualBilling && tier.monthlyPrice > 0 && (
                  <Typography variant="body2" sx={{ color: theme.colors.lightText }}>
                    Billed annually (${tier.annualPrice * 12}/year)
                  </Typography>
                )}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ mb: 3, flex: 1 }}>
                <Stack spacing={1.5}>
                  {tier.features.map((feature, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center' }}>
                      {feature.included ? (
                        <CheckCircleOutline sx={{ color: theme.colors.primary, mr: 1.5, fontSize: 20 }} />
                      ) : (
                        <Cancel sx={{ color: 'rgba(0,0,0,0.3)', mr: 1.5, fontSize: 20 }} />
                      )}
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: feature.included ? theme.colors.text : 'rgba(0,0,0,0.5)', 
                        }}
                      >
                        {feature.name}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
              
              <Button
                variant={tier.highlight ? "contained" : "outlined"}
                fullWidth
                href={tier.ctaLink}
                sx={{
                  py: 1.5,
                  bgcolor: tier.highlight ? tier.color : 'transparent',
                  borderColor: tier.color !== 'rgba(0,0,0,0.07)' ? tier.color : theme.colors.lightText,
                  color: tier.highlight ? 'white' : (tier.color !== 'rgba(0,0,0,0.07)' ? tier.color : theme.colors.lightText),
                  '&:hover': {
                    bgcolor: tier.highlight ? tier.color : `${tier.color}20`,
                    borderColor: tier.color !== 'rgba(0,0,0,0.07)' ? tier.color : theme.colors.lightText,
                  }
                }}
              >
                {tier.cta}
              </Button>
            </Paper>
          ))}
        </Box>
      </Container>

      {/* Feature comparison */}
      <Box sx={{ bgcolor: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 1, textAlign: 'center', color: theme.colors.text }}>
            Feature Comparison
          </Typography>
          <Typography variant="body1" sx={{ mb: 6, textAlign: 'center', color: theme.colors.lightText }}>
            A detailed breakdown of what's included in each plan
          </Typography>
          
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
                  <TableCell sx={{ fontWeight: 600, width: '40%' }}>Features</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>Free</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, bgcolor: `${theme.colors.primary}10` }}>Standard</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, bgcolor: `${theme.colors.secondary}10` }}>Premium</TableCell>
                </TableRow>
              </TableHead>
              
              {featureComparison.map((category, idx) => (
                <React.Fragment key={idx}>
                  <TableBody>
                    <TableRow sx={{ bgcolor: 'rgba(0,0,0,0.03)' }}>
                      <TableCell colSpan={4} sx={{ fontWeight: 600, py: 1 }}>
                        {category.category}
                      </TableCell>
                    </TableRow>
                    
                    {category.features.map((feature, featureIdx) => (
                      <TableRow key={featureIdx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {feature.name}
                        </TableCell>
                        <TableCell align="center">{feature.free}</TableCell>
                        <TableCell align="center" sx={{ bgcolor: `${theme.colors.primary}05` }}>{feature.standard}</TableCell>
                        <TableCell align="center" sx={{ bgcolor: `${theme.colors.secondary}05` }}>{feature.premium}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </React.Fragment>
              ))}
            </Table>
          </TableContainer>
        </Container>
      </Box>

      {/* Custom section */}
      <Box sx={{ py: 8, bgcolor: `${theme.colors.secondary}05` }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <LocalOffer sx={{ fontSize: 50, color: theme.colors.secondary, mb: 2 }} />
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 2, color: theme.colors.text }}>
            Need a Custom Solution?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: theme.colors.lightText }}>
            PromptMenu offers custom solutions for restaurant chains and enterprises with specific requirements.
            Our team will work with you to create a tailored package that perfectly fits your needs.
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            gap: 2
          }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: theme.colors.secondary,
                color: 'white',
                py: 1.5,
                px: 4,
                '&:hover': {
                  bgcolor: theme.colors.accent,
                }
              }}
              component={Link}
              href="/contact"
            >
              Contact Sales
            </Button>
            
            <Button
              variant="outlined"
              sx={{
                borderColor: theme.colors.secondary,
                color: theme.colors.secondary,
                py: 1.5,
                px: 4,
                '&:hover': {
                  borderColor: theme.colors.secondary,
                  bgcolor: `${theme.colors.secondary}10`,
                }
              }}
              component={Link}
              href="/demo"
            >
              Request Demo
            </Button>
          </Box>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 1, textAlign: 'center', color: theme.colors.text }}>
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" sx={{ mb: 6, textAlign: 'center', color: theme.colors.lightText }}>
            Find answers to common questions about PromptMenu pricing
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            {faqs.map((faq, index) => (
              <Accordion 
                key={index}
                expanded={expandedFaq === `panel${index}`} 
                onChange={handleFaqChange(`panel${index}`)}
                sx={{ 
                  mb: 1,
                  boxShadow: 'none',
                  border: '1px solid rgba(0,0,0,0.1)',
                  '&:before': {
                    display: 'none',
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{ 
                    bgcolor: expandedFaq === `panel${index}` ? `${theme.colors.primary}05` : 'transparent',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" sx={{ color: theme.colors.lightText }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
          
          <Box sx={{ textAlign: 'center', p: 4, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, color: theme.colors.text, fontWeight: 600 }}>
              Still have questions?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: theme.colors.lightText }}>
              Our team is ready to help you find the perfect plan for your restaurant.
            </Typography>
            <Button
              variant="contained"
              startIcon={<HelpOutline />}
              sx={{
                bgcolor: theme.colors.primary,
                color: 'white',
                '&:hover': {
                  bgcolor: theme.colors.lightGreen,
                }
              }}
              component={Link}
              href="/help"
            >
              Contact Support
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* Final CTA */}
      <Box sx={{ 
        py: 8, 
        bgcolor: theme.colors.primary,
        color: 'white',
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
            Ready to <span style={{ color: theme.colors.accent }}>PROMPT</span> Your Digital Menu Journey?
          </Typography>
          <Typography variant="h6" component="p" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of restaurants that have enhanced their dining experience with PromptMenu.
            Start your 14-day free trial of any plan today.
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: theme.colors.primary,
              py: 1.5,
              px: 5,
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
              }
            }}
            component={Link}
            href="/register/restaurant"
          >
            Get Started Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default PricingPage;