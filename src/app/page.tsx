"use client";

import { Header } from '@/components/Header';
import FeaturedTalent from '@/components/FeaturedTalent';
import ServicesSection from './components/ServicesSection';
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import '@/styles/globals.css';
import { ServiceCardProps } from '@/types/Props/ServiceCardProps';

const services: ServiceCardProps[] = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/5d79f1fffd1e7620a4c338cddbef99884683a36925aa74be6680c52bafef7600?apiKey=7fae980a988640eea8add1e49a5d542e&",
      title: "Model Casting",
      description: "Professional casting services for fashion shows, commercials, and photo shoots."
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/a705e2853423149ee6ba544e5efa45d2c810aa41e433eb08d372d93276e7cc72?apiKey=7fae980a988640eea8add1e49a5d542e&",
      title: "Talent Management",
      description: "Comprehensive management services for models and talents."
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/c9e285a0bbf12737dd32ab774704c26d6dd0e38b70a605e90d3a72a426647251?apiKey=7fae980a988640eea8add1e49a5d542e&",
      title: "Event Staffing",
      description: "Professional staff for events, exhibitions, and promotional activities."
    }
];

const Home: React.FC = () => {
  useEffect(() => {
    const textElement = document.querySelector('.slide-in-text');
    if (textElement) {
      textElement.classList.add('animate');
    }
  }, []);

  return (
    <div>
      <Header />
      <Hero />
      <FeaturedTalent />
      <ServicesSection services={services} />
      <br />
      <p style={{
        textAlign: 'center'
      }}>&copy; 2025 Staffing Solutions Hub</p>
    </div>
  );
};

export default Home;