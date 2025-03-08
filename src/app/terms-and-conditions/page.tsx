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
          Terms and Conditions
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          Welcome to Staffing Solutions Hub. These Terms and Conditions govern
          your use of our website and services. By accessing or using our
          services, you agree to comply with and be bound by these terms. If you
          do not agree, you must not use our services.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>1. Definitions:</strong> In these Terms and Conditions,
          “Services” refers to the services provided by Staffing Solutions Hub,
          including but not limited to connecting talent with companies in the
          entertainment industry.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>2. User Eligibility:</strong> By using our services, you
          confirm that you are at least 18 years old or have the consent of a
          parent or guardian. If you are using the services on behalf of an
          organization, you represent that you have the authority to bind that
          organization to these Terms.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>3. Account Registration:</strong> Users may be required to
          create an account to access certain features of our services. You
          agree to provide accurate and complete information during the
          registration process and to update such information as necessary.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>4. User Responsibilities:</strong> You are responsible for
          maintaining the confidentiality of your account credentials and for
          all activities that occur under your account. You agree to notify us
          immediately of any unauthorized use of your account.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>5. Prohibited Conduct:</strong> You agree not to engage in any
          of the following prohibited activities:
          <ul>
            <li>Using the services for any unlawful purpose</li>
            <li>Impersonating any person or entity</li>
            <li>
              Interfering with or disrupting the security or performance of our
              services
            </li>
            <li>
              Collecting or harvesting any personal information from other users
            </li>
          </ul>
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>6. Intellectual Property Rights:</strong> All content,
          trademarks, and other intellectual property on our website are owned
          by Staffing Solutions Hub or our licensors. You may not use,
          reproduce, or distribute any content without our prior written
          consent.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>7. Limitation of Liability:</strong> Staffing Solutions Hub
          shall not be liable for any indirect, incidental, or consequential
          damages arising from your use of our services. Our maximum liability
          is limited to the extent permitted by law.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>8. Changes to Terms:</strong> We reserve the right to modify
          these Terms and Conditions at any time. Any changes will be effective
          immediately upon posting on our website. Your continued use of our
          services after changes are made constitutes your acceptance of the new
          terms.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          <strong>9. Governing Law:</strong> These Terms and Conditions shall be
          governed by and construed in accordance with the laws of the
          jurisdiction in which Staffing Solutions Hub operates, without regard
          to its conflict of law principles.
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: 2, textAlign: "justify" }}
        >
          If you have any questions about these Terms and Conditions, please
          contact us at support@staffingsolutionshub.com.
        </Typography>
      </Box>
      <GreyFooter />
    </Box>
  );
};

export default About;
