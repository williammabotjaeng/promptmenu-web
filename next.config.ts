import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,
  
  eslint: {
    // This allows production builds to complete even if there are ESLint errors
    ignoreDuringBuilds: true,
  },
  
  output: 'export',
  
  // Fix 1: Add comma here
  images: {
    unoptimized: true
  },
  
  // Custom Webpack configuration
  webpack: (config) => {
    // Example: Add a custom loader
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
  
  // Environment variables
  env: {
    CUSTOM_API_URL: process.env.CUSTOM_API_URL,
  },
  
  // Fix 2: Remove this duplicate images section
  // images: {
  //   domains: ['cdn.builder.io'], // Allow images from this domain
  // },
  
  // Fix 3: i18n is not compatible with 'output: export'
  // Need to remove this or the static export won't work
  // i18n: {
  //   locales: ['en-US', 'fr', 'es'],
  //   defaultLocale: 'en-US',
  // },
};

export default nextConfig;
