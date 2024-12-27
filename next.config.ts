import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // domains: ['i.scdn.co', 'hpwskllhfbfuhsnysziq.supabase.co'], // Add the domain for Spotify's image host
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'hpwskllhfbfuhsnysziq.supabase.co',
      },
    ],
  },
  /* other config options here */
};

export default nextConfig;
