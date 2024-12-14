import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['i.scdn.co'], // Add the domain for Spotify's image host
  },
  /* other config options here */
};

export default nextConfig;
