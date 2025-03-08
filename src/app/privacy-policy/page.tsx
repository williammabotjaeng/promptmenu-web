"use client";

import * as React from "react";
import { WhiteHeader } from "@/components/WhiteHeader";
import GreyFooter from "@/components/GreyFooter";
import { Box, Typography } from "@mui/material";

const About: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f9f9f9",
        overflow: "hidden",
      }}
    >
      <WhiteHeader />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          paddingX: 2,
          paddingY: 1,
          color: "#333",
          marginTop: 1,
          width: "100%",
          maxWidth: "screen.xl",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "center" }}
        >
          Privacy Policy
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          At Staffing Solutions Hub, we are committed to protecting your
          privacy. This Privacy Policy outlines how we collect, use, disclose,
          and safeguard your information when you visit our website and use our
          services. Please read this policy carefully to understand our
          practices regarding your personal data.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>1. Information We Collect:</strong> We may collect personal
          information that you provide directly to us, such as your name, email
          address, phone number, and any other information you choose to provide
          when registering for our services or contacting us.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>2. How We Use Your Information:</strong> We use your
          information to:
          <ul>
            <li>Provide and manage our services</li>
            <li>Communicate with you about your account or our services</li>
            <li>Improve our services and website</li>
            <li>Send you marketing communications, if you have opted in</li>
            <li>Comply with legal obligations</li>
          </ul>
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>3. Data Sharing and Disclosure:</strong> We do not sell or
          rent your personal information to third parties. We may share your
          information with:
          <ul>
            <li>
              Service providers who assist us in operating our website and
              services
            </li>
            <li>
              Legal authorities, if required by law or to protect our rights
            </li>
            <li>
              Business partners for marketing purposes, if you have consented
            </li>
          </ul>
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>4. Data Security:</strong> We take reasonable measures to
          protect your personal information from unauthorized access, use, or
          disclosure. However, no method of transmission over the internet or
          method of electronic storage is 100% secure, and we cannot guarantee
          its absolute security.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>5. Your Rights:</strong> Depending on your location, you may
          have certain rights regarding your personal data, including:
          <ul>
            <li>The right to access your personal information</li>
            <li>The right to request correction of inaccurate data</li>
            <li>The right to request deletion of your data</li>
            <li>
              The right to object to processing or request restriction of
              processing
            </li>
          </ul>
          To exercise these rights, please contact us using the information
          below.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>6. Changes to This Privacy Policy:</strong> We may update this
          Privacy Policy from time to time. Any changes will be posted on this
          page, and we encourage you to review this policy periodically for any
          updates.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>7. Contact Us:</strong> If you have any questions or concerns
          about this Privacy Policy or our data practices, please contact us at
          support@staffingsolutionshub.com.
        </Typography>
      </Box>
      <GreyFooter />
    </Box>
  );
};

export default About;
