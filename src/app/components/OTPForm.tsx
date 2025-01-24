import * as React from 'react';
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Facebook, Google, Twitter } from '@mui/icons-material';
import useUserDataStore from '@/state/use-user-data-store';
import { useCookies } from 'react-cookie';
import { useAuth } from '@/providers/auth-providers';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { eventNames } from 'process';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface OTPFormProps {
  username: string;
}

export const OTPForm: React.FC<OTPFormProps> = ({ username }) => {

  const { verifyOtp } = useAuth();
  const [otp, setOtp] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await verifyOtp(username, otp);

      setSnackbarMessage('OTP verification successful!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);


      setSnackbarMessage("Login successful! Redirecting...");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setTimeout(() => {
          router.push('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('OTP verification failed:', error);
      setSnackbarMessage('OTP verification failed. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Grid container sx={{ height: { xs: '100%', md: '125vh' }, backgroundColor: 'black' }}>
      {/* Left Column */}
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', padding: { xs: 1, md: 4 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: { xs: 1, md: 12 } }}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/c3fc10b45272c7c3f40000cb49e896f62fd831f2d1f6075f068d38a771d3152f?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt="Company logo"
            style={{ maxWidth: '204px', marginBottom: '20px' }}
          />
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', mt: { xs: 0, md: 16 } }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#977342', marginBottom: 2 }}>
              Verify One Time Pin
            </Typography>
            <Typography variant="body1" sx={{ color: 'gray', marginBottom: 4 }}>
              Enter OTP sent to your email
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* Styled Input Fields */}
              <TextField
                label="OTP"
                type="text"
                name="otp"
                placeholder="Enter your OTP"
                fullWidth
                value={otp}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{
                  sx: {
                    color: '#977342',
                    '&.Mui-focused': {
                      color: '#977342',
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    color: '#977342',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#977342',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#977342',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#977342',
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  marginTop: 3,
                  backgroundColor: '#977342',
                  color: 'white',
                  padding: '10px 20px',
                  width: '100%',
                  '&:hover': {
                    backgroundColor: '#977342',
                    color: 'white',
                  },
                }}
              >
                Verify Email
              </Button>
              <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                  OTP expires in <span style={{ color: '#977342' }}>{'10:00'}</span>
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
      </Grid>

      {/* Right Column */}
      <Grid item xs={12} md={6} sx={{ display: { md: 'flex', xs: 'none' }, position: 'relative' }}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/0ca397a6303443cf9ac61c117ae8a3d543e83d9bdce376c072ed0bd5eade2785?apiKey=7fae980a988640eea8add1e49a5d542e&"
          alt="Background fashion event"
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', top: 0, left: 0 }}
        />
        {/* Black Overlay */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          {/* Slogan */}
          <Box sx={{ position: 'absolute', top: 16, left: 16, color: 'white' }}>
            <Typography variant="h6">
              Staffing Your Success, One Event at a Time.
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', marginTop: 1, opacity: 0.6 }}>
              Connect with top brands and opportunities in the fashion industry.
            </Typography>
          </Box>
          {/* Social Icons */}
          <Box sx={{ position: 'absolute', bottom: 16, left: 16, display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#977342',
                  color: 'white',
                },
              }}
            >
              <Facebook />
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#977342',
                  color: 'white',
                },
              }}
            >
              <Google />
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#977342',
                  color: 'white',
                },
              }}
            >
              <Twitter />
            </Button>
          </Box>
          {/* Snackbar for feedback */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Grid>
    </Grid>
  );
};