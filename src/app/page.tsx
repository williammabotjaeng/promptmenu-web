"use client";

import { useEffect, useState, useRef } from "react";
import { Box, CircularProgress, Fade } from "@mui/material";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LoadingScreen from "@/components/LoadingScreen";
import "@/styles/globals.css";

// Import refactored components
import FeatureShowcase from "@/components/FeatureShowcase";
import ServiceSection from "@/components/ServiceSection";
import StatisticsSection from "@/components/StatisticsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CTASection from "@/components/CTASection";

// Microsoft-inspired color scheme
const theme = {
  colors: {
    primary: "#107C10", // Microsoft green
    secondary: "#0078D4", // Microsoft blue
    accent: "#50E6FF", // Azure blue
    lightGreen: "#84c680",
    background: "#f5f5f5",
    text: "#323130",
    lightText: "#605E5C",
    white: "#FFFFFF",
  },
};

// PromptMenu services
const services = [
  {
    icon: "menu_book",
    title: "Digital Menu Creation",
    description: "Create interactive, multimedia-rich digital menus that showcase your dishes in stunning detail.",
  },
  {
    icon: "videocam",
    title: "Video Integration",
    description: "Add preparation videos, chef introductions, and ingredient highlights to your menu items.",
  },
  {
    icon: "translate",
    title: "AI Translation",
    description: "Break language barriers with automatic menu translation powered by Azure AI technology.",
  },
  {
    icon: "analytics",
    title: "Customer Insights",
    description: "Collect and analyze customer feedback to optimize your menu and improve satisfaction.",
  },
];

// PromptMenu statistics
const statistics = [
  { value: "300+", label: "Restaurant Partners" },
  { value: "50,000+", label: "Dishes Digitized" },
  { value: "15+", label: "Languages Supported" },
];

// PromptMenu quick links
const quickLinks = [
  { label: "About Us", url: "/about" },
  { label: "Features", url: "/features" },
  { label: "Pricing", url: "/pricing" },
  { label: "Help Center", url: "/help" },
];

// PromptMenu contact info
const contactInfo = [
  {
    icon: "location_on",
    text: "Microsoft Technology Center<br />New York, NY - USA",
    alt: "Location icon",
  },
  {
    icon: "phone",
    text: "+1 (800) 123-4567",
    alt: "Phone icon",
  },
  {
    icon: "email",
    text: "support@promptmenu.com",
    alt: "Email icon",
  },
];

// PromptMenu social links
const socialLinks = [
  {
    icon: "facebook",
    url: "https://facebook.com",
    alt: "Facebook",
  },
  {
    icon: "twitter",
    url: "https://twitter.com",
    alt: "Twitter",
  },
  {
    icon: "instagram",
    url: "https://instagram.com",
    alt: "Instagram",
  },
];

// Testimonials data
const testimonials = [
  {
    name: "Michael Rodriguez",
    role: "Executive Chef, Bistro Elegance",
    quote: "PromptMenu has transformed our dining experience. Our customers love seeing how dishes are prepared, and the AI translation has been perfect for our international guests.",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
  },
  {
    name: "Sarah Chen",
    role: "Owner, Fusion Kitchen",
    quote: "Since implementing PromptMenu, we've seen a 30% increase in orders of our specialty dishes. The video previews give diners confidence to try new items.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1558&q=80"
  },
  {
    name: "David Wilson",
    role: "Marketing Director, Harvest Table",
    quote: "The insights we get from PromptMenu have been invaluable. We've optimized our menu based on customer feedback and saw our ratings improve within weeks.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
  },
];

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Handle initial loading
  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Update header state
      setScrolled(scrollY > 50);
      
      // Check each section for animations
      sectionsRef.current.forEach((section, index) => {
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        const triggerPoint = window.innerHeight * 0.75;
        
        if (rect.top < triggerPoint) {
          section.classList.add('section-visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize animation classes
    setTimeout(() => {
      handleScroll();
    }, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add a ref to a section
  const addSectionRef = (index: number) => (el: HTMLDivElement) => {
    sectionsRef.current[index] = el;
  };

  return (
    <>
      {/* Loading screen */}
      {loading && (<LoadingScreen />)}
      
      {/* Main content */}
      <Fade in={!loading} timeout={800}>
        <Box sx={{ overflowX: 'hidden' }}>
          <Header />
          
          {/* Hero Section */}
          <div ref={addSectionRef(0)} className="scroll-section">
            <Hero />
          </div>
          
          {/* Feature Showcase */}
          <div ref={addSectionRef(1)} id="features" className="scroll-section">
            <FeatureShowcase />
          </div>
          
          {/* Services Section */}
          <div ref={addSectionRef(2)} id="service" className="scroll-section">
            <ServiceSection services={services} />
          </div>
          
          {/* Statistics Section */}
          <div ref={addSectionRef(3)} className="scroll-section">
            <StatisticsSection statistics={statistics} />
          </div>
          
          {/* How It Works */}
          <div ref={addSectionRef(4)} id="howitworks" className="scroll-section">
            <HowItWorksSection />
          </div>
          
          {/* Call To Action */}
          <div ref={addSectionRef(6)} className="scroll-section">
            <CTASection />
          </div>
          
          <Footer
            quickLinks={quickLinks}
            contactInfo={contactInfo}
            socialLinks={socialLinks}
          />
        </Box>
      </Fade>
    </>
  );
};

export default Home;