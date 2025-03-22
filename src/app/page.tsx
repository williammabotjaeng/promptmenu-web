"use client";

import { Header } from "@/components/Header";
import FeaturedTalent from "@/components/FeaturedTalent";
import ServicesSection from "@/components/ServicesSection";
import StatisticsSection from "@/components/StatisticsSection";
import JourneySection from "@/components/JourneySection";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import Hero from "@/components/Hero";
import "@/styles/globals.css";
import { ServiceCardProps } from "@/types/Props/ServiceCardProps";
import { StatisticProps } from "@/types/Props/StatisticProps";
import { SocialLinkProps } from "@/types/Props/SocialLinkProps";
import { ContactInfoProps } from "@/types/Props/ContactInfoProps";
import { QuickLinkProps } from "@/types/Props/QuickLinkProps";

const services: ServiceCardProps[] = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/5d79f1fffd1e7620a4c338cddbef99884683a36925aa74be6680c52bafef7600?apiKey=7fae980a988640eea8add1e49a5d542e&",
    title: "Model Casting",
    description:
      "Professional casting services for fashion shows, commercials, and photo shoots.",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/a705e2853423149ee6ba544e5efa45d2c810aa41e433eb08d372d93276e7cc72?apiKey=7fae980a988640eea8add1e49a5d542e&",
    title: "Talent Management",
    description: "Comprehensive management services for models and talents.",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/c9e285a0bbf12737dd32ab774704c26d6dd0e38b70a605e90d3a72a426647251?apiKey=7fae980a988640eea8add1e49a5d542e&",
    title: "Event Staffing",
    description:
      "Professional staff for events, exhibitions, and promotional activities.",
  },
];

const statistics: StatisticProps[] = [
  { value: "500+", label: "Active Talents" },
  { value: "1000+", label: "Projects Completed" },
  { value: "10+", label: "Years Experience" },
];

const quickLinks: QuickLinkProps[] = [
  { label: "About Us", url: "/about" },
  { label: "Services", url: "/services" },
  { label: "Talents", url: "/talents" },
  { label: "Contact", url: "/contact" },
];

const contactInfo: ContactInfoProps[] = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/bd9218bddf10ff4202f017f0da0dd77b751fff6efa58c75c2f7f1d8195f2464e?apiKey=7fae980a988640eea8add1e49a5d542e&",
    text: "ACICO Business Park<br /> Port Saeed, Dubai - UAE",
    alt: "Location icon",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/848db9fc87c68681b29840fb17094f6e480c9d600bd326929935bbef800e9af0?apiKey=7fae980a988640eea8add1e49a5d542e&",
    text: "+971 56 759 8878",
    alt: "Phone icon",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/4fa58bbacc4d342ef6cfc871e5d077eac587efbf1733a329c80d04f593df603f?apiKey=7fae980a988640eea8add1e49a5d542e&",
    text: "info@staffingsolutionshub.com",
    alt: "Email icon",
  },
];

const socialLinks: SocialLinkProps[] = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/54b48ce2587af5184710fbdfd924c8c960f07e7e104fa0112c85e634e4d7143c?apiKey=7fae980a988640eea8add1e49a5d542e&",
    url: "#",
    alt: "Social media icons",
  },
];

const Home: React.FC = () => {
  useEffect(() => {
    const textElement = document.querySelector(".slide-in-text");
    if (textElement) {
      textElement.classList.add("animate");
    }
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <FeaturedTalent />
      <ServicesSection services={services} />
      <StatisticsSection statistics={statistics} />
      <JourneySection />
      <Footer />
    </>
  );
};

export default Home;
