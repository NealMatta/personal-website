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
  /*
  Field notes are Markdown files read at request time by the RSS route,
  and path.join(process.cwd(), …) is too dynamic for the file tracer to
  follow, so ship the folder with every function explicitly.
  */
  outputFileTracingIncludes: {
    '/**': ['./src/content/field-notes/**/*'],
  },
};

export default nextConfig;
