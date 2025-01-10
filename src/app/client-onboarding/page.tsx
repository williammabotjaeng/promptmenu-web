"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { useOnboarding } from '@/providers/onboarding-providers';
import { Box } from '@mui/material';
import { Grid, TextField } from '@mui/material';
import PaymentMethod from '@/components/dashboard/onboarding/PaymentMethod';
import CompanyInfo from '@/components/dashboard/onboarding/CompanyInfo';
import AddressAndContactInfo from '@/components/dashboard/onboarding/AddressContactInfo';

const ClientOnboarding: React.FC = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['companyData']);
  const [activeStep, setActiveStep] = useState(0);
  const [companyData, setCompanyData] = useState({
    name: '',
    logo: null,
    slogan: '',
    description: '',
    address: '',
    phone_number: '',
    whatsapp_number: '',
    payment_method: '',
    website: '',
    social_media_links: {},
  });

  const [contactInfoData, setContactInfoData] = useState({
    address: "123 Tech Lane, Silicon Valley, CA 94043",
    phone_number: "+1 (555) 123-4567",
    whatsapp_number: "+1 (555) 987-6543",
  });

  const [dummyCompanyData, setDummyCompanyData] = useState({
    name: "Tech Innovations Inc.",
    slogan: "Innovating the Future",
    description: "Tech Innovations Inc. is dedicated to creating cutting-edge technology solutions that empower businesses and enhance everyday life. Our mission is to drive progress through innovation and excellence in service.",
  });

  const [paymentMethods, setPaymentMethods] = useState({
    payment_method: 'creditCard',
    ccNumber: '4111 1111 1111 1111',
    ccFirstName: 'John',
    ccLastName: 'Doe',
    ccExpiry: '12/25',
    ccCVC: '123',
    paypalEmail: 'john.doe@example.com',
    stripeDetails: 'Stripe account details here',
  });

  const steps = [
    { title: "Step 1: Basic Information", content: "Please provide your basic information." },
    { title: "Step 2: Business Details", content: "Tell us about your business." },
    { title: "Step 3: Preferences", content: "Set your preferences." },
    { title: "Step 4: Review", content: "Review your information." },
    { title: "Step 5: Submit", content: "Submit your information." },
  ];

  useEffect(() => {
    // Load company data from the onboarding provider or cookies
    const loadCompanyData = async () => {
      const response = await fetch('/api/company'); // Replace with your API endpoint
      const data = await response.json();
      if (data) {
        setCompanyData(data);
      }
    };

    loadCompanyData();
  }, []);

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleSkip = () => {
    // Save current step data to cookies
    setCookie('companyData', JSON.stringify(companyData), { path: '/' });
    router.push('/dashboard');
  };

  const handleSubmit = async () => {
    const method = companyData.id ? 'PUT' : 'POST';
    const endpoint = companyData.id ? `/dashboard/company/${companyData.id}` : '/dashboard/company';

    await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(companyData),
    });

    router.push('/dashboard');
  };

  return (
    <Box className="onboarding-container" sx={{
      width: '100vw'
    }}>
      <div className="onboarding-content">
        <h2 style={{ color: 'black' }}>{steps[activeStep].title}</h2>
        <p style={{ color: 'black' }}>{steps[activeStep].content}</p>

        {/* Render input fields based on the active step */}
        {activeStep === 0 && (
          <CompanyInfo activeStep={activeStep} companyInfo={dummyCompanyData} setCompanyInfo={setDummyCompanyData} />
        )}
        {activeStep === 1 && (
          <AddressAndContactInfo activeStep={activeStep} contactInfoData={contactInfoData} setContactInfoData={setContactInfoData} />
        )}
        {activeStep === 2 && (
          <PaymentMethod paymentMethods={paymentMethods} setPaymentMethods={setPaymentMethods} activeStep={activeStep} />
        )}
        {activeStep === 3 && (
          <div className="w-full" style={{ margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container spacing={2} maxWidth="md">
              <Grid item xs={12} sm={6}>
                <TextField
                  id="website"
                  label="Website"
                  placeholder="Website"
                  variant="outlined"
                  fullWidth
                  value={companyData.website}
                  onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="twitter"
                  label="Twitter"
                  placeholder="Twitter URL"
                  variant="outlined"
                  fullWidth
                  value={companyData.social_media_links.twitter || ''}
                  onChange={(e) => setCompanyData({ ...companyData, social_media_links: { ...companyData.social_media_links, twitter: e.target.value } })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="facebook"
                  label="Facebook"
                  placeholder="Facebook URL"
                  variant="outlined"
                  fullWidth
                  value={companyData.social_media_links.facebook || ''}
                  onChange={(e) => setCompanyData({ ...companyData, social_media_links: { ...companyData.social_media_links, facebook: e.target.value } })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="instagram"
                  label="Instagram"
                  placeholder="Instagram URL"
                  variant="outlined"
                  fullWidth
                  value={companyData.social_media_links.instagram || ''}
                  onChange={(e) => setCompanyData({ ...companyData, social_media_links: { ...companyData.social_media_links, instagram: e.target.value } })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="linkedin"
                  label="LinkedIn"
                  placeholder="LinkedIn URL"
                  variant="outlined"
                  fullWidth
                  value={companyData.social_media_links.linkedin || ''}
                  onChange={(e) => setCompanyData({ ...companyData, social_media_links: { ...companyData.social_media_links, linkedin: e.target.value } })}
                />
              </Grid>
            </Grid>
          </div>
        )}
        {activeStep === 4 && (
          <div>
            <h3>Review Your Information</h3>
            <pre>{JSON.stringify(companyData, null, 2)}</pre>
          </div>
        )}
        <br />
        <br />
        <div>
          {activeStep > 0 && (
            <button onClick={handleBack} style={{ marginRight: '10px', backgroundColor: '#000', color: '#977342', borderRadius: '12px' }}>
              Back
            </button>
          )}
          {activeStep < steps.length - 1 && (
            <button onClick={handleNext} style={{ backgroundColor: '#977342', color: '#fff', borderRadius: '12px' }}>
              Next
            </button>
          )}
          {activeStep === steps.length - 1 && (
            <button onClick={handleSubmit} style={{ backgroundColor: '#977342', color: '#fff', borderRadius: '12px' }}>
              Submit
            </button>
          )}
          <button onClick={handleSkip} style={{ marginLeft: '10px', backgroundColor: '#000', color: '#977342', borderRadius: '12px' }}>
            Skip this for now
          </button>
        </div>
      </div>

    </Box>
  );
};

export default ClientOnboarding;