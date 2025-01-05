import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,
  eslint: {
    // This allows production builds to complete even if there are ESLint errors
    ignoreDuringBuilds: true,
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

  // Image optimization settings
  images: {
    domains: ['example.com'], // Allow images from this domain
  },

  // Internationalization (i18n) settings
  i18n: {
    locales: ['en-US', 'fr', 'es'],
    defaultLocale: 'en-US',
  },

  // Other configurations can be added here
};

export default nextConfig;