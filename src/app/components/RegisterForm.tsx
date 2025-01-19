import * as React from "react";
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Avatar } from "@mui/material";

const features = [
  {
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/5c5bfd1ec12c04f279f21f2648c74866d0b0282e771fabdd8fe37da008bc7b31?apiKey=7fae980a988640eea8add1e49a5d542e&",
    text: "Access exclusive casting calls",
    alt: "Casting calls icon"
  },
  {
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/c5defcacc66dabe2be6ffd54da4ea88231a7030e6df7a6e3e05df7ad124aaedb?apiKey=7fae980a988640eea8add1e49a5d542e&",
    text: "Professional portfolio management",
    alt: "Portfolio management icon"
  },
  {
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/0cd76d0fce7ef8ee48c4c02ce39a649bf4d2e533f796c4f3db98c8e90fbc7062?apiKey=7fae980a988640eea8add1e49a5d542e&",
    text: "International opportunities",
    alt: "International opportunities icon"
  }
];

export const RegisterForm: React.FC = () => {
  return (
    <Box className="flex flex-col bg-black bg-opacity-0" sx={{ padding: 4 }}>
      <Box className="flex flex-col pr-20 pb-96 w-full bg-black max-md:pr-5 max-md:pb-24 max-md:max-w-full">
        <Box className="flex flex-col pb-32 bg-black bg-opacity-0 max-md:pb-24 max-md:max-w-full">
          <Box className="flex flex-col pt-8 mb-0 bg-black bg-opacity-0 max-md:mb-2.5 max-md:max-w-full">
            <Box className="flex flex-col items-start self-end px-16 max-w-full text-3xl font-bold text-orange-300 bg-black bg-opacity-0 w-[1280px] max-md:px-5">
              <Box className="flex z-10 flex-wrap gap-10 items-start -mb-3 max-md:mb-2.5">
                <Box className="flex-auto mt-5">Staffing Solutions Hub</Box>
                <Box className="flex shrink-0 h-9 bg-black bg-opacity-0 w-[238px]" />
              </Box>
            </Box>
            <Avatar
              src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/2e248f686084c42693cd3ddb966bfe6c73111179b483633b87406237d39077db?apiKey=7fae980a988640eea8add1e49a5d542e&"
              alt="Staffing Solutions Logo"
              sx={{ width: 200, height: 'auto', marginTop: 0, boxShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
            />
            <Box className="flex z-10 flex-col px-20 pt-64 mt-0 mb-0 max-md:px-5 max-md:pt-24 max-md:mt-0 max-md:mb-2.5 max-md:max-w-full">
              <Box className="flex flex-col items-start pt-2 mt-64 max-w-full bg-black bg-opacity-0 w-[616px] max-md:mt-10">
                <Typography variant="h1" sx={{ fontWeight: 'bold', color: 'white', fontSize: '48px' }}>
                  Join the Winning <span style={{ display: 'block', color: '#977342' }}>Talent Network</span>
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2, color: 'white', marginBottom: 2 }}>
                  Connect with top casting directors, agencies, and <span style={{ display: 'block' }}>productions across the Middle East</span>
                </Typography>
                <Box className="flex flex-col self-stretch mt-10 w-full bg-black bg-opacity-0 max-md:max-w-full">
                  {features.map((feature, index) => (
                    <Box key={index} display="flex" alignItems="center" gap={1} sx={{ marginBottom: 4 }}>
                      <Avatar src={feature.iconSrc} alt={feature.alt} sx={{ width: 24, height: 24 }} />
                      <Typography variant="body2" color="white">{feature.text}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
              <form className="flex z-10 flex-col self-end px-10 pt-8 pb-12 mt-0 max-w-full text-white rounded-2xl bg-white bg-opacity-10 w-[624px] max-md:px-5 max-md:mt-0">
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'orange.300' }}>
                  Create Your Account
                </Typography>
                <Box className="flex flex-col pb-14 mt-6 w-full text-sm bg-black bg-opacity-0 max-md:max-w-full">
                  <Box className="flex flex-wrap gap-4 bg-black bg-opacity-0 max-md:max-w-full">
                    <TextField label="First Name" id="firstName" variant="outlined" fullWidth margin="normal" />
                    <TextField label="Last Name" id="lastName" variant="outlined" fullWidth margin="normal" />
                  </Box>
                  <TextField label="Email Address" type="email" id="email" variant="outlined" fullWidth margin="normal" />
                  <TextField label="Phone Number" type="tel" id="phone" variant="outlined" fullWidth margin="normal" />
                  <TextField label="Password" type="password" id="password" variant="outlined" fullWidth margin="normal" />
                  <TextField label="Confirm Password" type="password" id="confirmPassword" variant="outlined" fullWidth margin="normal" />
                  <FormControlLabel
                    control={<Checkbox id="terms" />}
                    label="I agree to the Terms of Service and Privacy Policy"
                    sx={{ color: 'gray.400' }}
                  />
                </Box>
                <Button variant="contained" color="primary" type="submit" sx={{ padding: '16px', marginTop: 2 }}>
                  Create Account
                </Button>
                <Box className="self-center mt-28 ml-5 text-xs leading-none text-center text-black max-md:mt-10">
                  <span className="text-sm text-white">Already have an account?</span>
                  <Button variant="text"  sx={{ padding: 0 }}> Sign in</Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
        <Box className="self-end px-16 py-1 mt-32 mr-8 mb-0 w-full max-w-screen-xl text-sm leading-none text-center text-gray-400 bg-black bg-opacity-0 max-md:px-5 max-md:mt-10 max-md:mr-2.5 max-md:mb-2.5 max-md:max-w-full">
          © 2025 Casting Dubai. All rights reserved.
        </Box>
      </Box>
    </Box>
  );
};