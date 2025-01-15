"use client";

import { RegistrationData } from '@/types/RegistrationData';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAuth } from '@/providers/auth-providers';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { redirect } from 'next/navigation';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import useUserStore from "@/state/use-user-store";
import { useStore } from "zustand";
import { useCookies } from 'react-cookie';
import moment from 'moment';
import '@/styles/register-form.css';
import PhoneInput from 'react-phone-input-2';
import axios from 'axios';
import 'react-phone-input-2/lib/style.css';
import PictureAsPdf from '@mui/icons-material/PictureAsPdf';
import { Close } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface RegisterFormProps {
  userRole: string;
}

const inputStyles = {
  "& .MuiInputLabel-root.Mui-focused": {
    display: 'none'
  },
  "& .MuiInputLabel-root.Mui-shrink": {
  display: 'none',
  },
};

const RegisterForm: React.FC<RegisterFormProps> = ({ userRole }) => {

  const [isInfluencer, setIsInfluencer] = useState('no');
  const [nationality, setNationality] = useState('');
  const [region, setRegion] = useState('');
  const [hasAccepted, setHasAccepted] = useState(false);
  const [cookies, setCookie] = useCookies(['nationality', 'vatPdf', 'tradePdf']);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [customPaymentTerms, setCustomPaymentTerms] = useState('');
  const [preferredPaymentMethods, setPreferredPaymentMethods] = useState({
    directTransfer: false,
    creditCard: false,
    cash: false,
  });
  const [vatPdf, setVatPdf] = useState('');
  const [tradePdf, setTradePdf] = useState('');
  const [addressOptions, setAddressOptions] = useState([]);
  const [addressInputValue, setAddressInputValue] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    date_of_birth: '',
    user_role: userRole,
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

  const handleCountryChange = (val: React.SetStateAction<string>) => {
    setNationality(val);
    setRegion('');
  };

  const handleRegionChange = (val) => {
    setRegion(val);
  };

  const handleAcceptance = (val: React.SetStateAction<boolean>) => {
    setHasAccepted(!hasAccepted);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { register } = useAuth();

  const { setCurrentUser } = useStore(useUserStore);

  const [useWhatsApp, setUseWhatsApp] = useState(true);

  const handleWhatsAppChange = (event: any) => {
    setUseWhatsApp(event.target.checked);
  };

  const formatDateToYYYYMMDD = (date: string) => {
    return moment(date).format('YYYY-MM-DD');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedDate = formatDateToYYYYMMDD(formData?.date_of_birth);
    console.log("Form Data", formData);
    try {

      await register(
        formData.username,
        formData.password,
        formData.email,
        formattedDate,
        userRole,
        formData.firstname,
        formData.lastname,
        formData.gender,
        formData.phonenumber,
        nationality,
        String(hasAccepted),
        isInfluencer,
        formData.whatsapp_number,
        formData.preferred_payment_methods,
        formData.vat_certificate,
        formData.trade_license,
        formData.custom_payment_terms,
        formData.accept_std_payment_terms,
        formData.accounts_email,
        formData.mobile_number,
        formData.job_title,
        formData.contact_person,
        formData.state_province_region,
        formData.company_name
      );

      setCurrentUser(formData.username, '');
      setCookie('nationality', nationality);

      // Show success message and redirect to login
      setSnackbarMessage('Registration successful! Redirecting to OTP Page...');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // Redirect after a short delay
      setTimeout(() => {
        redirect('/otp')
      }, 2000);

    } catch (error: any) {
      console.error('Registration failed:', error);
      let errorMessage = 'Registration failed. Please try again.';

      // Handle specific error messages
      if (error?.response) {
        if (error?.response.data.message.includes('unique constraint')) {
          errorMessage = 'Email or username already exists.';
        }
      }

      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleRemoveVatPdf = () => {
    setVatPdf(null);
    setCookie('vatPdf', null);
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

  return (
    <Box className="container">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Username Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              label={<Typography variant="body1">Username</Typography>}
              name="username"
              placeholder="Enter your username"
              required
              fullWidth
              onChange={handleChange}
              className="custom-input"
              sx={inputStyles}
            />
          </Grid>

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

          <Grid container spacing={2}>
            {/* Terms of Payment */}
            <Grid item xs={12}>
              <Typography variant="body1">
                Terms of payment are 50% advance, 50% on project completion.
              </Typography>
            </Grid>

            {/* Custom Payment Terms Field */}
            <Grid item xs={12}>
              <TextField
                label="If you have your own payment terms, please specify (subject to approval)"
                placeholder="Enter your payment terms"
                fullWidth
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
                <Typography color="black">Trade License</Typography>
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
                <Typography color="black">VAT Certificate</Typography>
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
        </Grid>
      </form>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%', color: '#977342', backgroundColor: 'black' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterForm;