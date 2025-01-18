"use client";

import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAuth } from '@/providers/auth-providers';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import useUserDataStore from '@/state/use-user-data-store';
import { restCall } from '@/services/restCall';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const OTPForm: React.FC<{ username: string }> = ({ username }) => {
  const { verifyOtp } = useAuth();
  const [otp, setOtp] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [cookies, setCookie] = useCookies([
    'vatPdf', 'tradePdf', 'access'
  ]);
  const [vatPdf, setVatPdf] = useState(cookies['vatPdf']);
  const [tradePdf, setTradePdf] = useState(cookies['tradePdf']);

  const accessToken = cookies['access'];

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await verifyOtp(username, otp);

      handleTradePdfUpload();
      handleVatPdfUpload();
      setSnackbarMessage('OTP verification successful!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);


      setSnackbarMessage("Login successful! Redirecting...");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setTimeout(() => {


        if (useUserDataStore?.getState()?.onboarding_presented) {
          console.log("Routing option 1");
          const redirectPath = useUserDataStore?.getState()?.user_role === 'client' ? '/dashboard' : '/portal';
          router.push(redirectPath);
        } else if (useUserDataStore?.getState()?.profile_completed) {
          console.log("Routing option 2");
          const onboardingPath = useUserDataStore?.getState()?.user_role === 'client' ? '/dashboard' : '/talent-onboarding';
          console.log("Redirecting to: ", onboardingPath, "with user role", useUserDataStore?.getState()?.user_role);
          router.push(onboardingPath);
        } else {
          console.log("Routing option 3");
          const fallbackPath = useUserDataStore?.getState()?.user_role === 'client' ? '/dashboard' : '/portal';
          router.push(fallbackPath);
        }
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

  const saveFileMetadata = async (fileName: any, s3Url: any) => {
    try {
      const response = await restCall('/portal/save-file-metadata/', 'POST', {
        file_name: fileName,
        s3_url: s3Url,
      }, accessToken);

      if (response.status === 201) {
        console.log('File metadata saved:', response.data);
      } else {
        console.error('Failed to save file metadata:', response);
      }
    } catch (error) {
      console.error('Error saving file metadata:', error);
    }
  };

  const uploadToS3 = async (blob: Blob, fileName: string) => {
    const fileType = blob.type;
    try {
      const response = await restCall(`/portal/generate-presigned-url/?file_name=${fileName}&file_type=${fileType}`, 'GET', {}, accessToken);

      const { url } = response;

      if (url) {
        const uploadResponse = await axios.put(url, blob, {
          headers: {
            'Content-Type': fileType,
          },
        });

        if (uploadResponse.status === 200) {
          console.log('Upload successful!');
          const s3Url = url.split('?')[0];
          await saveFileMetadata(fileName, s3Url);
          return s3Url;
        } else {
          console.error('Upload failed:', uploadResponse.statusText);
        }
      } else {
        console.error('Failed to get presigned URL');
      }
    } catch (error) {
      console.error('Error during upload:', error);
    }
  };

  const handleVatPdfUpload = async () => {
    const vatPdfBlob = cookies.vatPdf; 
    if (vatPdfBlob) {
      const response = await fetch(vatPdfBlob);
      const blob = await response.blob();
      const fileName = `VAT_PDF_${username}_${Date.now()}.pdf`;

      const s3Url = await uploadToS3(blob, fileName);
      if (s3Url) {
        setSnackbarMessage('VAT PDF Uploaded Successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage('Failed to upload VAT PDF');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
  };

  const handleTradePdfUpload = async () => {
    const tradePdfBlob = cookies.tradePdf;
    if (tradePdfBlob) {
      const response = await fetch(tradePdfBlob);
      const blob = await response.blob(); 
      const fileName = `TRADE_PDF_${username}_${Date.now()}.pdf`;

      const s3Url = await uploadToS3(blob, fileName);
      if (s3Url) {
        setSnackbarMessage('Trade PDF Uploaded Successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage('Failed to upload Trade PDF');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: '400px', margin: '0 auto', padding: '20px', backgroundColor: 'var(--primary-bg)', color: 'var(--primary-text)', border: '2px solid #977342', borderRadius: '8px', fontFamily: 'Open Sans', outline: '2px solid #977342', outlineOffset: '4px', marginTop: '24px' }}>
      <h1 style={{ textAlign: 'center', color: 'var(--dark-gold)' }}>Verify OTP</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
        <TextField
          label="Enter OTP"
          name="otp"
          value={otp}
          onChange={handleChange}
          fullWidth
          required
          onFocus={(e) => e.target.style.color = "#977342"}
          onBlur={(e) => e.target.style.color = "#977342"}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#977342",
                color: "#977342"
              },
              "&:hover fieldset": {
                borderColor: "#977342",
                color: "#977342"
              },
              "&.Mui-focused fieldset": {
                borderColor: "#977342",
                color: "#977342",
              },
              "&.Mui-filled fieldset": {
                borderColor: "#977342",
                color: "#977342",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#977342",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#977342",
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#977342",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#CEAB76",
            },
          }}
        >
          Verify OTP
        </Button>
      </form>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose}  sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OTPForm;