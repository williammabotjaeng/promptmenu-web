"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Container,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  MenuBook,
  ArrowRight,
  Security,
  CheckCircle,
  ExpandMore,
  Lock,
  Storage,
  Devices,
  DataUsage,
  AddCircleOutline,
  DeleteOutline,
  Visibility,
  PersonAdd,
  Public,
  Badge,
  Cancel,
} from "@mui/icons-material";
import Link from "next/link";

export default function PrivacyPolicy() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    // Add animation effect on mount
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e0f2f1 100%)",
      }}
    >
      {/* Header Bar */}
      <Box
        sx={{
          py: 2,
          px: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255,255,255,0.8)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          position: "relative",
          zIndex: 5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MenuBook sx={{ color: "#107C10", fontSize: 32 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(90deg, #107C10, #0078D4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
            }}
            onClick={handleHome}
          >
            PromptMenu
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: "#555",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 21 21"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="1" y="1" width="9" height="9" fill="#f25022" />
              <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
              <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
              <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
            </svg>
            Powered by Azure AI
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          py: 4,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            opacity: isLoading ? 0 : 1,
            transform: isLoading ? "translateY(20px)" : "translateY(0)",
            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
          }}
        >
          {/* Breadcrumbs */}
          <Breadcrumbs sx={{ mb: 4 }}>
            <Link href="/" passHref>
              <MuiLink
                sx={{
                  color: "#0078D4",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Home
              </MuiLink>
            </Link>
            <Typography color="text.primary">Privacy Policy</Typography>
          </Breadcrumbs>

          <Paper
            elevation={2}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 3,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Security sx={{ color: "#107C10", fontSize: 32, mr: 2 }} />
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                Privacy Policy
              </Typography>
            </Box>

            <Typography
              variant="subtitle1"
              sx={{ mb: 3, color: "text.secondary" }}
            >
              Last Updated: March 27, 2025
            </Typography>

            <Box sx={{ mb: 5 }}>
              <Typography variant="body1" paragraph>
                At PromptMenu, we take your privacy seriously. This Privacy
                Policy describes how we collect, use, store, and share your
                information when you use our digital menu platform, including
                our website, mobile applications, and all services provided
                through them (collectively, the "Service").
              </Typography>
              <Typography variant="body1" paragraph>
                By using our Service, you agree to the collection and use of
                information in accordance with this policy. We will not use or
                share your information with anyone except as described in this
                Privacy Policy.
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 2, fontWeight: 600, color: "#107C10" }}
              >
                Information We Collect
              </Typography>

              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleAccordionChange("panel1")}
                sx={{
                  mb: 2,
                  boxShadow: "none",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: 1,
                }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PersonAdd sx={{ color: "#0078D4", mr: 2 }} />
                    <Typography variant="h6">
                      Registration Information
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" paragraph>
                    When you register for an account, we collect the following
                    information:
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <ArrowRight sx={{ color: "#107C10" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Name"
                        secondary="Your full name or the name of your business contact"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ArrowRight sx={{ color: "#107C10" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email address"
                        secondary="Used for account access and communications"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ArrowRight sx={{ color: "#107C10" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Phone number"
                        secondary="For account verification and support"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ArrowRight sx={{ color: "#107C10" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Business information"
                        secondary="Restaurant name, address, and other details"
                      />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleAccordionChange("panel2")}
                sx={{
                  mb: 2,
                  boxShadow: "none",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: 1,
                }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Devices sx={{ color: "#0078D4", mr: 2 }} />
                    <Typography variant="h6">Usage Data</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" paragraph>
                    We automatically collect certain information when you visit,
                    use, or navigate our Service. This information may include:
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <ArrowRight sx={{ color: "#107C10" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Device information"
                        secondary="Device type, operating system, and browser type"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ArrowRight sx={{ color: "#107C10" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Log data"
                        secondary="Your IP address, browser type, pages visited, time spent, and referring pages"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ArrowRight sx={{ color: "#107C10" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Location data"
                        secondary="General location based on IP address"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ArrowRight sx={{ color: "#107C10" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="User activity"
                        secondary="How you interact with our Service, including menu views and QR code scans"
                      />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleAccordionChange("panel3")}
                sx={{
                  mb: 2,
                  boxShadow: "none",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: 1,
                }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <DataUsage sx={{ color: "#0078D4", mr: 2 }} />
                    <Typography variant="h6">
                      Menu and Business Content
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" paragraph>
                    For restaurant owners and managers, we collect information
                    about your menu items and business, including:
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <ArrowRight sx={{ color: "#107C10" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Menu information"
                        secondary="Item names, descriptions, prices, ingredients, allergens, and categories"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ArrowRight sx={{ color: "#107C10" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Media content"
                        secondary="Photos, videos, and other multimedia content related to your menu items"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ArrowRight sx={{ color: "#107C10" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Business details"
                        secondary="Business hours, contact information, and location"
                      />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel4"}
                onChange={handleAccordionChange("panel4")}
                sx={{
                  mb: 2,
                  boxShadow: "none",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: 1,
                }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Lock sx={{ color: "#0078D4", mr: 2 }} />
                    <Typography variant="h6">Payment Information</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" paragraph>
                    If you purchase a subscription or other paid services, we
                    collect payment information, which may include:
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <ArrowRight sx={{ color: "#107C10" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Payment method details"
                        secondary="Credit card number, expiration date, and CVV (collected and processed via secure third-party payment processors)"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ArrowRight sx={{ color: "#107C10" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Billing address"
                        secondary="Address associated with your payment method"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ArrowRight sx={{ color: "#107C10" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Transaction history"
                        secondary="Records of your purchases and subscription information"
                      />
                    </ListItem>
                  </List>
                  <Typography
                    variant="body2"
                    sx={{ mt: 2, fontStyle: "italic" }}
                  >
                    Note: PromptMenu does not store your full credit card
                    information. Payment processing is handled by secure,
                    PCI-compliant third-party payment processors.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 2, fontWeight: 600, color: "#107C10" }}
              >
                How We Use Your Information
              </Typography>
              <Typography variant="body1" paragraph>
                We use the information we collect for various purposes,
                including:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Providing our Service"
                    secondary="To operate, maintain, and improve the features and functionality of PromptMenu"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Customer support"
                    secondary="To respond to your inquiries, troubleshoot problems, and provide technical support"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Processing transactions"
                    secondary="To process your payments and manage your subscriptions"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Analytics"
                    secondary="To understand how users interact with our Service and improve user experience"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Communication"
                    secondary="To send you updates, security alerts, and support messages"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Marketing"
                    secondary="To send you promotional materials and information about new features or services (you can opt out at any time)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Legal compliance"
                    secondary="To comply with applicable laws, regulations, and legal processes"
                  />
                </ListItem>
              </List>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 2, fontWeight: 600, color: "#107C10" }}
              >
                How We Share Your Information
              </Typography>
              <Typography variant="body1" paragraph>
                We may share your information with the following types of third
                parties:
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <Badge sx={{ color: "#0078D4" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Service Providers"
                    secondary="We work with third-party service providers to help us operate, provide, improve, and market our Service. These providers have access to your information only to perform tasks on our behalf and are obligated not to disclose or use it for any other purpose."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Public sx={{ color: "#0078D4" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Business Transfers"
                    secondary="If PromptMenu is involved in a merger, acquisition, or sale of all or a portion of its assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website of any change in ownership or uses of your information."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Visibility sx={{ color: "#0078D4" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Legal Requirements"
                    secondary="We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency)."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Visibility sx={{ color: "#0078D4" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Protection of Rights"
                    secondary="We may disclose your information to protect the safety, rights, or property of PromptMenu, our users, or others, including to protect against fraud or other illegal activity."
                  />
                </ListItem>
              </List>

              <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic" }}>
                Note: We do not sell your personal information to third parties.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 2, fontWeight: 600, color: "#107C10" }}
              >
                Data Security
              </Typography>
              <Typography variant="body1" paragraph>
                We take the security of your information seriously and implement
                appropriate technical and organizational measures to protect
                your personal information against unauthorized access,
                alteration, disclosure, or destruction.
              </Typography>
              <Typography variant="body1" paragraph>
                These security measures include:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Lock sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Encryption"
                    secondary="We use industry-standard encryption protocols (SSL/TLS) to protect data in transit"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Lock sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Secure infrastructure"
                    secondary="Our services are hosted in secure, SOC 2 compliant data centers"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Lock sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Access controls"
                    secondary="Strict employee access controls and authentication requirements"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Lock sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Regular security audits"
                    secondary="We conduct regular security assessments and penetration testing"
                  />
                </ListItem>
              </List>
              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                Despite our efforts, no method of transmission over the Internet
                or electronic storage is 100% secure. Therefore, while we strive
                to protect your personal information, we cannot guarantee its
                absolute security.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 2, fontWeight: 600, color: "#107C10" }}
              >
                Data Retention
              </Typography>
              <Typography variant="body1" paragraph>
                We retain your personal information for as long as necessary to
                fulfill the purposes outlined in this Privacy Policy, unless a
                longer retention period is required or permitted by law. The
                criteria used to determine our retention periods include:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRight sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText primary="How long the information is needed to provide our services, maintain your account, and operate our business" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRight sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText primary="Whether there are legal, contractual, or similar obligations that require us to keep the information for a certain period" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRight sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText primary="Whether retaining the information is necessary to prevent fraud or abuse, protect our users, or defend our legal rights" />
                </ListItem>
              </List>
              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                When we no longer need to process your information for the
                purposes described in this Privacy Policy, we will delete your
                information from our systems or anonymize it so that it can no
                longer be associated with you.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 2, fontWeight: 600, color: "#107C10" }}
              >
                Your Privacy Rights
              </Typography>
              <Typography variant="body1" paragraph>
                Depending on your location, you may have certain rights
                regarding your personal information, including:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Visibility sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Right to access"
                    secondary="You can request copies of your personal information that we hold"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AddCircleOutline sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Right to rectification"
                    secondary="You can ask us to correct inaccurate personal information or complete incomplete information"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <DeleteOutline sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Right to erasure"
                    secondary="You can ask us to delete or remove your personal information in certain circumstances"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Visibility sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Right to restrict processing"
                    secondary="You can ask us to limit the processing of your personal information"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <DataUsage sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Right to data portability"
                    secondary="You can ask us to transfer your personal information to you or a third party in a commonly used format"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Cancel sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Right to object"
                    secondary="You can object to our processing of your personal information in certain circumstances"
                  />
                </ListItem>
              </List>
              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                To exercise any of these rights, please contact us at
                privacy@promptmenu.com. We will respond to your request within
                30 days.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 2, fontWeight: 600, color: "#107C10" }}
              >
                Children's Privacy
              </Typography>
              <Typography variant="body1" paragraph>
                Our Service is not directed to individuals under the age of 16.
                We do not knowingly collect personal information from children
                under 16. If you become aware that a child has provided us with
                personal information without parental consent, please contact us
                at privacy@promptmenu.com. If we become aware that we have
                collected personal information from a child under 16 without
                verification of parental consent, we will take steps to remove
                that information from our servers.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 2, fontWeight: 600, color: "#107C10" }}
              >
                International Data Transfers
              </Typography>
              <Typography variant="body1" paragraph>
                Your information may be transferred to — and maintained on —
                computers located outside of your state, province, country, or
                other governmental jurisdiction where the data protection laws
                may differ from those in your jurisdiction.
              </Typography>
              <Typography variant="body1" paragraph>
                If you are located outside the United States and choose to
                provide information to us, please note that we transfer the
                information, including personal information, to the United
                States and process it there. Your submission of such information
                represents your agreement to that transfer.
              </Typography>
              <Typography variant="body1" paragraph>
                When we transfer personal information from the European Economic
                Area, United Kingdom, or Switzerland to the United States, we
                use approved data transfer mechanisms, such as standard
                contractual clauses, to ensure that your rights and protections
                travel with your data.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 2, fontWeight: 600, color: "#107C10" }}
              >
                Cookies and Similar Technologies
              </Typography>
              <Typography variant="body1" paragraph>
                We use cookies and similar tracking technologies to track
                activity on our Service and hold certain information. Cookies
                are files with a small amount of data that may include an
                anonymous unique identifier. Cookies are sent to your browser
                from a website and stored on your device.
              </Typography>
              <Typography variant="body1" paragraph>
                We use the following types of cookies:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRight sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Essential cookies"
                    secondary="Necessary for the operation of our website and cannot be switched off in our systems"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRight sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Analytical/performance cookies"
                    secondary="Allow us to recognize and count the number of visitors and see how visitors move around our website"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRight sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Functionality cookies"
                    secondary="Enable the website to provide enhanced functionality and personalization"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRight sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Targeting cookies"
                    secondary="Record your visit to our website, the pages you have visited, and the links you have followed"
                  />
                </ListItem>
              </List>
              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                You can instruct your browser to refuse all cookies or to
                indicate when a cookie is being sent. However, if you do not
                accept cookies, you may not be able to use some portions of our
                Service.
              </Typography>
            </Box>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 2, fontWeight: 600, color: "#107C10" }}
              >
                Changes to This Privacy Policy
              </Typography>
              <Typography variant="body1" paragraph>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last Updated" date at the top of
                this policy.
              </Typography>
              <Typography variant="body1" paragraph>
                You are advised to review this Privacy Policy periodically for
                any changes. Changes to this Privacy Policy are effective when
                they are posted on this page. For significant changes, we will
                make reasonable efforts to provide notification via email or
                through a notice on our website prior to the changes becoming
                effective.
              </Typography>
              <Typography variant="body1" paragraph>
                Your continued use of our Service after we post any
                modifications to the Privacy Policy will constitute your
                acknowledgment of the modifications and your consent to abide
                and be bound by the modified Privacy Policy.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 2, fontWeight: 600, color: "#107C10" }}
              >
                Third-Party Links and Services
              </Typography>
              <Typography variant="body1" paragraph>
                Our Service may contain links to third-party websites, services,
                or applications that are not owned or controlled by PromptMenu.
                We have no control over, and assume no responsibility for, the
                content, privacy policies, or practices of any third-party
                websites or services.
              </Typography>
              <Typography variant="body1" paragraph>
                We do not monitor or review the content of other parties'
                websites which are linked from our website or media platforms.
                Opinions expressed or materials appearing on such websites are
                not necessarily shared or endorsed by us, and we should not be
                regarded as the publisher of such opinions or materials.
              </Typography>
              <Typography variant="body1" paragraph>
                We strongly advise you to read the terms and conditions and
                privacy policy of any third-party website that you visit.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 2, fontWeight: 600, color: "#107C10" }}
              >
                Do Not Track Signals
              </Typography>
              <Typography variant="body1" paragraph>
                Some browsers feature a "Do Not Track" (DNT) setting that
                requests that websites not track users' browsing activities. At
                present, there is no uniform standard for interpreting DNT
                signals. Our Service does not currently respond to DNT browser
                signals or any other mechanism that automatically communicates
                your choice not to be tracked online.
              </Typography>
              <Typography variant="body1" paragraph>
                However, you can generally express your privacy preferences
                regarding the use of cookies and similar technologies through
                your web browser. You can set your browser to refuse all cookies
                or to indicate when a cookie is being set. Look for the cookie
                settings in your browser in the "options" or "preferences" menu.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 2, fontWeight: 600, color: "#107C10" }}
              >
                California Privacy Rights
              </Typography>
              <Typography variant="body1" paragraph>
                If you are a California resident, the California Consumer
                Privacy Act (CCPA) grants you specific rights regarding your
                personal information. This section describes your CCPA rights
                and explains how to exercise those rights.
              </Typography>
              <Typography variant="body1" paragraph>
                Under the CCPA, you have the following rights:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRight sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Right to know"
                    secondary="You have the right to request information about the categories of personal information we collect, the purposes for which we use personal information, and the categories of third parties with whom we share personal information."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRight sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Right to access"
                    secondary="You have the right to request a copy of the specific pieces of personal information we have collected about you in the past 12 months."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRight sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Right to deletion"
                    secondary="You have the right to request that we delete personal information we have collected from you, subject to certain exceptions."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRight sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Right to opt-out of sales"
                    secondary="You have the right to opt-out of the sale of your personal information. Note that we do not currently sell your personal information as defined by the CCPA."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRight sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Right to non-discrimination"
                    secondary="You have the right not to be discriminated against for exercising your CCPA rights."
                  />
                </ListItem>
              </List>
              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                To exercise your rights under the CCPA, please contact us at
                privacy@promptmenu.com or call us at 1-800-MENU-APP. We will
                respond to verifiable requests within 45 days.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 2, fontWeight: 600, color: "#107C10" }}
              >
                GDPR Compliance
              </Typography>
              <Typography variant="body1" paragraph>
                For users in the European Economic Area (EEA), we process your
                personal information in accordance with the General Data
                Protection Regulation (GDPR). The lawful bases for processing
                your personal information include:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRight sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Consent"
                    secondary="You have given consent for processing your personal information for one or more specific purposes"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRight sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Performance of a contract"
                    secondary="Processing is necessary for the performance of a contract with you or to take steps to enter into a contract"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRight sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Legal obligation"
                    secondary="Processing is necessary for compliance with a legal obligation to which we are subject"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRight sx={{ color: "#107C10" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Legitimate interests"
                    secondary="Processing is necessary for our legitimate interests or the legitimate interests of a third party, unless there is a good reason to protect your personal information which overrides those legitimate interests"
                  />
                </ListItem>
              </List>
              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                If you are located in the EEA, you have the right to lodge a
                complaint with a supervisory authority if you believe our
                processing of your personal information does not comply with
                GDPR requirements.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 2, fontWeight: 600, color: "#107C10" }}
              >
                Contact Us
              </Typography>
              <Typography variant="body1" paragraph>
                If you have any questions about this Privacy Policy, please
                contact us at:
              </Typography>
              <Box sx={{ pl: 2, borderLeft: "4px solid #107C10", mb: 2 }}>
                <Typography variant="body1">
                  <strong>Email:</strong> privacy@promptmenu.com
                  <br />
                  <strong>Address:</strong> PromptMenu, Inc.
                  <br />
                  123 Digital Lane
                  <br />
                  Seattle, WA 98101
                  <br />
                  United States
                  <br />
                  <strong>Phone:</strong> 1-800-MENU-APP
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                By using PromptMenu's services, you acknowledge that you have
                read, understood, and agree to this Privacy Policy.
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, color: "text.secondary" }}
              >
                This policy is effective as of March 27, 2025.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};
