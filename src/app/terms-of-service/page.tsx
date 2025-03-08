"use client";

import * as React from "react";
import { WhiteHeader } from "@/components/WhiteHeader";
import GreyFooter from "@/components/GreyFooter";
import { Box, Typography } from "@mui/material";

const TermsOfService: React.FC = () => {
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
          Terms of Service
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          Welcome to Staffing Solutions Hub. By accessing or using our services,
          you agree to comply with and be bound by the following terms and
          conditions. Please read these terms carefully before using our
          services.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>1. Acceptance of Terms:</strong> By using our website and
          services, you confirm that you accept these terms of service and that
          you agree to comply with them. If you do not agree to these terms, you
          must not use our services.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>2. Services Provided:</strong> Staffing Solutions Hub provides
          a platform for connecting talented individuals with companies in the
          entertainment and media industries. We strive to ensure that our
          services meet the needs of both our clients and talent.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>3. User Responsibilities:</strong> Users are responsible for
          maintaining the confidentiality of their account information and for
          all activities that occur under their account. You agree to notify us
          immediately of any unauthorized use of your account.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>4. Intellectual Property:</strong> All content, trademarks,
          and other intellectual property on our website are owned by Staffing
          Solutions Hub or our licensors. You may not use, reproduce, or
          distribute any content without our prior written consent.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>5. Limitation of Liability:</strong> Staffing Solutions Hub
          shall not be liable for any indirect, incidental, or consequential
          damages arising from your use of our services. Our liability is
          limited to the maximum extent permitted by law.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>6. Changes to Terms:</strong> We reserve the right to modify
          these terms at any time. Any changes will be effective immediately
          upon posting on our website. Your continued use of our services after
          changes are made constitutes your acceptance of the new terms.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>7. Governing Law:</strong> These terms shall be governed by
          and construed in accordance with the laws of the jurisdiction in which
          Staffing Solutions Hub operates, without regard to its conflict of law
          principles.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          If you have any questions about these terms, please contact us at
          support@staffingsolutionshub.com.
        </Typography>
      </Box>
      <GreyFooter />
    </Box>
  );
};

export default TermsOfService;
