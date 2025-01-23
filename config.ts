import dotenv from 'dotenv';

dotenv.config();

const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000', 
  nextAuthSecret: process.env.NEXTAUTH_SECRET || 'your_default_secret', 
};

export default config;