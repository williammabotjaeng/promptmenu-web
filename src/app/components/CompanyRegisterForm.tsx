import * as React from "react";
import { Box, TextField, Button, Checkbox, FormControlLabel, Avatar, Grid, FormControl, Radio, RadioGroup, IconButton, Typography } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import SSHGoldLogo from '@/assets/GoldLogo.png';
import Image from 'next/image';
import { useState } from "react";

import { useAuth } from "@/providers/auth-providers";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useCookies } from "react-cookie";
import { redirect } from "next/navigation";
import Link from "next/link";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import Close from "@mui/icons-material/Close";
import moment from "moment";
import axios from "axios";
import { useStore } from "zustand";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Autocomplete from '@mui/material/Autocomplete';

import WorkIcon from '@mui/icons-material/Work'; 
import CampaignIcon from '@mui/icons-material/Campaign';
import StarsIcon from '@mui/icons-material/Stars';
import LanguageIcon from '@mui/icons-material/Language';
import PostAddIcon from '@mui/icons-material/PostAdd'; 
import PeopleIcon from '@mui/icons-material/People'; 

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const features = [
  {
    text: "Showcase your company to top talent",
    alt: "Showcase icon"
  },
  {
    text: "Post jobs and manage applications",
    alt: "Job posting icon"
  },
  {
    text: "Connect with casting directors and productions",
    alt: "Connections icon"
  }
];

const inputStyles = {
  "& .MuiInputLabel-root.Mui-focused": {
    display: 'none'
  },
  "& .MuiInputLabel-root.Mui-shrink": {
    display: 'none',
  },
};

export const CompanyRegisterForm: React.FC = () => {

  const [isInfluencer, setIsInfluencer] = useState('no');
  const [nationality, setNationality] = useState('');
  const [region, setRegion] = useState('');
  const [hasAccepted, setHasAccepted] = useState(false);
  const [cookies, setCookie] = useCookies(['nationality', 'vatPdf', 'tradePdf', 'user_role']);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [customPaymentTerms, setCustomPaymentTerms] = useState('');
  const [agreement, setAgreement] = useState('yes');
  const [preferredPaymentMethods, setPreferredPaymentMethods] = useState({
    directTransfer: false,
    creditCard: false,
    cash: false,
  });
  const [vatPdf, setVatPdf] = useState('');
  const [tradePdf, setTradePdf] = useState('');
  const [addressOptions, setAddressOptions] = useState([]);
  const [addressInputValue, setAddressInputValue] = useState('');

  const userRole = cookies['user_role'];

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    date_of_birth: '',
    user_role: '',
    firstname: '',
    lastname: '',
    gender: 'male',
    phonenumber: '',
    nationality: phoneNumber,
    has_accepted: hasAccepted,
    is_influencer: isInfluencer,
    whatsapp_number: '',
    preferred_payment_methods: '',
    vat_certificate: '',
    trade_license: '',
    custom_payment_terms: '',
    accept_std_payment_terms: '',
    accounts_email: '',
    mobile_number: '',
    job_title: '',
    contact_person: '',
    state_province_region: '',
    company_name: ''

  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const fetchAddressSuggestions = async (value) => {
    if (value.length > 2) {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: value,
          format: 'json',
          addressdetails: 1,
          limit: 5,
        },
      });
      setAddressOptions(response.data);
    } else {
      setAddressOptions([]);
    }
  };

  const handleAgreementChange = (event) => {
    setAgreement(event?.target?.value);
  };

  const handleInfluencerChange = (event) => {
    setIsInfluencer(event.target.value);
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target || {};
    if (name) {
      setPhoneNumber(value);
    }
  };

  const handlePreferredPaymentMethodChange = (event) => {
    const { name, checked } = event.target;
    setPreferredPaymentMethods((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleMobileChange = (e) => {
    const { name, value } = e.target || {};
    if (name) {
      setMobileNumber(value);
    }
  };

  const handleWhatsAppNumberChange = (e) => {
    const { name, value } = e.target || {};
    if (name) {
      setWhatsappNumber(value);
    }
  };

  const handleVatPdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setVatPdf(objectUrl);
      setCookie('vatPdf', objectUrl);
      setSnackbarMessage('PDF Uploaded Successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  };

  const handleCountryChange = (val: React.SetStateAction<string>) => {
    setNationality(val);
    setRegion('');
  };

  const handleRegionChange = (val) => {
    setRegion(val);
  };

  const handleAcceptance = () => {
    setHasAccepted(!hasAccepted);
  }

  const handleRemoveVatPdf = () => {
    setVatPdf(null);
    setCookie('vatPdf', null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [useWhatsApp, setUseWhatsApp] = useState(true);

  const handleWhatsAppChange = (event: any) => {
    setUseWhatsApp(event.target.checked);
  };

  const formatDateToYYYYMMDD = (date: string) => {
    return moment(date).format('YYYY-MM-DD');
  };

  const handleTradePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setTradePdf(objectUrl);
      setCookie('tradePdf', objectUrl);
      setSnackbarMessage('PDF Uploaded Successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  };

  const handleRemoveTradePdf = () => {
    setTradePdf(null);
    setCookie('tradePdf', null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  function handleSubmit(event: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: 'transparent' }}>
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={4}>
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <Box sx={{ display: { md: 'flex', xs: 'none' }, alignItems: 'flex-start', position: 'relative', mb: 2 }}>
      <Link href="/">
        <Image
          src={SSHGoldLogo.src}
          alt="Staffing Solutions Logo"
          width={200}
          height={204}
          style={{ opacity: 0.5, overflow: 'hidden' }}
        />
      </Link>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: '#977342',
          fontSize: '20px',
          opacity: 0.3,
          position: 'absolute',
          left: '155%',
          top: '36%',
          transform: 'translate(-50%, -100%)',
          width: '150%'
        }}
      >
        Staffing Solutions Hub
      </Typography>
    </Box>
    <Typography variant="h1" sx={{ fontWeight: 'bold', color: '#fff', fontSize: '48px', mb: 2 }}>
      Build Your <span style={{ display: 'block', color: '#977342' }}>Company Profile</span>
    </Typography>
    <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
      Showcase your company to top talent and connect with casting directors, agencies, and productions across the Middle East.
    </Typography>
    <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
      Take the next step and create your company profile to start posting jobs, managing applications, and finding the perfect talent for your projects.
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
      
        {features.map((feature, index) => (
          <Box key={index} display="flex" alignItems="center" gap={1} sx={{ marginBottom: 2 }}>
            {/* Replace Avatar with an appropriate MUI icon */}
            {index === 0 && <StarsIcon sx={{ color: '#CEAB76', fontSize: 24 }} />}
            {index === 1 && <CampaignIcon sx={{ color: '#CEAB76', fontSize: 24 }} />} 
            {index === 2 && <LanguageIcon sx={{ color: '#CEAB76', fontSize: 24 }} />} 
            <Typography variant="body2" color="white">{feature.text}</Typography>
          </Box>
        ))}
    </Box>
  </Box>
</Grid>

        {/* Right Column */}
        <Grid item xs={12} md={8}>
          <Box sx={{ backgroundColor: '#ffffff1a', padding: 4, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#977342', mb: 2 }}>
              Create Your Company Profile
            </Typography>
            <form onSubmit={handleSubmit} method="POST">
              <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                {/* State/Province/Region Field */}
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth required sx={{
                    height: '9.5vh'
                  }}>
                    <RegionDropdown
                      country={nationality}
                      value={region}
                      onChange={handleRegionChange}
                      className="custom-input country-dropdown"
                      style={{
                        width: '19vw'
                      }}
                    />
                  </FormControl>
                </Grid>

                {/* Nationality Field */}
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth required>
                    <div className="country-dropdown-container">
                      <CountryDropdown
                        value={nationality}
                        onChange={handleCountryChange}
                        className="custom-input country-dropdown"
                      />
                    </div>
                  </FormControl>
                </Grid>

                {/* Address Field */}
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    freeSolo
                    options={addressOptions.map(option => option?.display_name)}
                    onInputChange={(event, newInputValue) => {
                      setAddressInputValue(newInputValue);
                      fetchAddressSuggestions(newInputValue);
                    }}
                    onChange={(event, newValue) => {
                      setAddressInputValue(newValue);
                      handleChange({ target: { name: 'address', value: newValue } });
                    }}
                    sx={{
                      backgroundColor: 'white',
                      color: 'black'
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Enter your address"
                        label={<Typography variant="body1">Address</Typography>}
                        required
                        fullWidth
                        variant="outlined"
                        className="custom-input"
                        sx={inputStyles}
                      />
                    )}
                  />
                </Grid>

                {/* Company Name Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={<Typography variant="body1">Company Name</Typography>}
                    name="company_name"
                    placeholder="Enter your company name"
                    required
                    fullWidth
                    onChange={handleChange}
                    className="custom-input"
                    sx={inputStyles}
                  />
                </Grid>

                {/* Telephone Number Field */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Telephone Number</Typography>
                  <PhoneInput
                    country={'ae'}
                    onChange={handlePhoneChange}
                    value={phoneNumber}
                    inputStyle={{
                      width: '100%',
                      height: '56px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      color: 'black',
                      padding: '10px',
                      paddingLeft: '50px'
                    }}
                    buttonStyle={{
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      color: 'black'
                    }}
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: true
                    }}
                    placeholder="Enter your phone number"
                    inputClass="custom-phone-input"
                  />
                </Grid>

                {/* Email Field */}
                <Grid item xs={12} sm={6}>
                  <Typography color='black'>Email</Typography>
                  <TextField
                    label={<Typography variant="body1">Email</Typography>}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    fullWidth
                    onChange={handleChange}
                    className="custom-input"
                    sx={inputStyles}
                  />
                </Grid>

                {/* Contact Person */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={<Typography variant="body1">Contact Person</Typography>}
                    name="contact_person"
                    placeholder="Enter the contact person's name"
                    required
                    fullWidth
                    onChange={handleChange}
                    className="custom-input"
                    sx={inputStyles}
                  />
                </Grid>

                {/* Job Title */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={<Typography variant="body1">Job Title</Typography>}
                    name="job_title"
                    placeholder="Enter the job title"
                    required
                    fullWidth
                    onChange={handleChange}
                    className="custom-input"
                    sx={inputStyles}
                  />
                </Grid>

                {/* Mobile Number */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Mobile Number</Typography>
                  <PhoneInput
                    country={'ae'}
                    value={mobileNumber}
                    onChange={handleMobileChange}
                    inputStyle={{
                      width: '100%',
                      height: '56px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      color: 'black',
                      padding: '10px',
                      paddingLeft: '50px'
                    }}
                    buttonStyle={{
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      color: 'black'
                    }}
                    placeholder="Enter a Mobile Phone No."
                  />
                  <FormControlLabel
                    control={<Checkbox sx={{
                      color: 'white'
                    }} color="success" checked={useWhatsApp} onChange={handleWhatsAppChange} />}
                    label={<Typography variant="body1">I use this number for WhatsApp?</Typography>}
                  />
                </Grid>

                {/* WhatsApp Number Field (conditional) */}
                <Grid item xs={12} sm={6} style={{ display: !useWhatsApp ? 'block' : 'none' }}>
                  <Typography variant="body1">WhatsApp Number</Typography>
                  <PhoneInput
                    country={'ae'}
                    value={whatsappNumber}
                    onChange={handleWhatsAppNumberChange}
                    inputStyle={{
                      width: '100%',
                      height: '56px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      color: 'black',
                      padding: '10px',
                      paddingLeft: '50px'
                    }}
                    buttonStyle={{
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      color: 'black'
                    }}
                    placeholder="Enter your WhatsApp number"
                  />
                </Grid>


                {/* Terms of Payment */}
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Terms of payment are 50% advance, 50% on project completion.
                  </Typography>
                </Grid>
                <Grid item xs={12} container alignItems="center">
                  <RadioGroup row value={agreement} onChange={handleAgreementChange}>
                    <FormControlLabel value="yes" control={<Radio sx={{
                      color: '#977342'
                    }} />} label="Agree" />
                    <FormControlLabel value="no" control={<Radio sx={{
                      color: '#977342'
                    }} />} label="I do not Agree" />
                  </RadioGroup>
                </Grid>


                {/* Custom Payment Terms Field */}
                <Grid item xs={12}>
                  <TextField
                    label="If you have your own payment terms, please specify (subject to approval)"
                    placeholder="Enter your payment terms"
                    fullWidth
                    disabled={agreement === 'yes' ? true : false}
                    name="custom_payment_terms"
                    onChange={handleChange}
                    variant="outlined"
                    multiline
                    rows={4}
                    sx={{
                      border: '1px solid #977342',
                      borderRadius: '12px',
                      color: 'white'
                    }}
                    color="warning"
                    className='custom-input'
                  />
                </Grid>

                {/* Preferred Payment Method */}
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <Typography variant="body1">Preferred Payment Method</Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            color: 'white'
                          }}
                          color="success"
                          checked={preferredPaymentMethods.directTransfer}
                          onChange={handlePreferredPaymentMethodChange}
                          name="directTransfer"
                        />
                      }
                      label="Direct Transfer"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            color: 'white'
                          }}
                          color="success"
                          checked={preferredPaymentMethods.creditCard}
                          onChange={handlePreferredPaymentMethodChange}
                          name="creditCard"
                        />
                      }
                      label="Credit Card"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            color: 'white'
                          }}
                          color="success"
                          checked={preferredPaymentMethods.cash}
                          onChange={handlePreferredPaymentMethodChange}
                          name="cash"
                        />
                      }
                      label="Cash"
                    />
                  </FormControl>
                </Grid>


                {/* Email Field */}
                <Grid item xs={12} sm={6}>
                  <Typography variant='body1'>Accounts Department Email</Typography>
                  <TextField
                    label={<Typography variant="body1">Accounts Department Email</Typography>}
                    type="email"
                    name="accounts_email"
                    placeholder="Enter your accounts email"
                    required
                    fullWidth
                    onChange={handleChange}
                    className="custom-input"
                    sx={inputStyles}
                  />
                </Grid>

                <Grid container spacing={2}>
                  {/* Trade License Column */}
                  <Grid item xs={6}>
                    <Box flex="1" display="flex" flexDirection="column" alignItems="center" sx={{
                      border: '4px dotted black',
                      margin: '4px',
                      borderRadius: '12px',
                      padding: '4px',
                      height: '50vh'
                    }}>
                      <Typography variant="body1">Trade License</Typography>
                      {tradePdf ? (
                        <Box display="flex" flexDirection={"column"} alignItems="center">
                          <PictureAsPdf sx={{ fontSize: 90, color: 'red', mt: 8 }} />
                          <Typography variant="body1" sx={{ marginLeft: 1 }}>{'File Uploaded'}</Typography>
                          <IconButton color="error" onClick={() => handleRemoveTradePdf()}>
                            <Close />
                          </IconButton>
                        </Box>
                      ) : (
                        <IconButton color="primary" component="label" sx={{ marginTop: 2 }}>
                          <PictureAsPdf sx={{
                            height: '30vh',
                            fontSize: '80px'
                          }} />
                          <input type="file" hidden accept="application/pdf" onChange={(e) => handleTradePdfUpload(e)} />
                        </IconButton>
                      )}
                    </Box>
                  </Grid>

                  {/* VAT Certificate Column */}
                  <Grid item xs={6}>
                    <Box flex="1" display="flex" flexDirection="column" alignItems="center" sx={{
                      border: '4px dotted black',
                      margin: '4px',
                      borderRadius: '12px',
                      padding: '4px',
                      height: '50vh'
                    }}>
                      <Typography variant="body1">VAT Certificate</Typography>
                      {vatPdf ? (
                        <Box display="flex" flexDirection={"column"} alignItems="center">
                          <PictureAsPdf sx={{ fontSize: 90, color: 'red', mt: 8 }} />
                          <Typography variant="body1" sx={{ marginLeft: 1 }}>{'File Uploaded'}</Typography>
                          <IconButton color="error" onClick={() => handleRemoveVatPdf()}>
                            <Close />
                          </IconButton>
                        </Box>
                      ) : (
                        <IconButton color="primary" component="label" sx={{ marginTop: 2 }}>
                          <PictureAsPdf sx={{
                            height: '30vh',
                            fontSize: '80px'
                          }} />
                          <input type="file" hidden accept="application/pdf" onChange={(e) => handleVatPdfUpload(e)} />
                        </IconButton>
                      )}
                    </Box>
                  </Grid>
                  <Typography variant="body1" sx={{
                    fontStyle: 'italic',
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '10px'
                  }}>Only Image and PDF Files allowed.</Typography>
                </Grid>

                {/* Password */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={<Typography variant="body1">Password</Typography>}
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    fullWidth
                    onChange={handleChange}
                    className="custom-input"
                    sx={inputStyles}
                  />
                </Grid>

                {/* Confirm Password */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={<Typography variant="body1">Confirm Password</Typography>}
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    required
                    fullWidth
                    onChange={handleChange}
                    className="custom-input"
                    sx={inputStyles}
                  />
                </Grid>

                {/* Influencer Question */}
                {userRole === 'talent' && (<Grid item xs={12}>
                  <Typography variant="h5">
                    Are you a Popular influencer?
                  </Typography>
                  <RadioGroup row value={isInfluencer} onChange={handleInfluencerChange}>
                    <FormControlLabel
                      control={<Radio sx={{
                        color: 'white'
                      }} color="success" />}
                      label="Yes"
                      value="yes"
                    />
                    <FormControlLabel
                      control={<Radio sx={{
                        color: 'white'
                      }} color="success" />}
                      label="No"
                      value="no"
                    />
                  </RadioGroup>
                </Grid>)}

                {/* Submit Button */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value={hasAccepted} onChange={handleAcceptance} color="success" sx={{
                      color: 'white'
                    }} className="custom-input" />}
                    label={
                      <Typography variant="body1">
                        By clicking here and going to the next step I declare that I have read and accept the <Link href="/">Ts & Cs</Link> of SSH.
                      </Typography>
                    }
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    style={{ display: 'block', marginTop: '20px', border: '1px solid #977342' }}
                  >
                    <Typography variant="body1">Register</Typography>
                  </Button>
                </Grid>
          </Box>
        </form>
    </Box>
        </Grid >
      </Grid >
  <Box sx={{ textAlign: 'center', marginTop: 4, color: 'gray.400', fontSize: { xs: '12px' } }}>
    © 2025 Staffing Solutions Hub. All rights reserved.
  </Box>
{/* Snackbar for notifications */ }
<Snackbar
  open={snackbarOpen}
  autoHideDuration={6000}
  onClose={handleSnackbarClose}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  sx={{
    '& .MuiSnackbarContent-root': {
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      width: { xs: '90%', sm: '400px' },
      margin: '0 auto',
      backgroundColor: '#ffffff',
    },
  }}
>
  <Alert
    onClose={handleSnackbarClose}
    severity={snackbarSeverity}
    sx={{
      width: '100%',
      backgroundColor: '#ffffff',
      color: '#333', 
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'flex-start', 
    }}
  >
    {/* Display the list of messages */}
    {snackbarMessage.split('\n').map((message, index) => (
      <div
        key={index}
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: index !== snackbarMessage.split('\n').length - 1 ? '8px' : '0',
        }}
      >
        <span
          style={{
            marginRight: '8px',
            fontSize: '18px',
          }}
        >
          {message.startsWith('✅') ? '✅' : '❌'}
        </span>
        <span>{message.slice(2).trim()}</span>
      </div>
    ))}
  </Alert>
</Snackbar>
    </Box >
  );
};