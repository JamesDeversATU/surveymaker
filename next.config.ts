import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)', // Applies the headers to all routes
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline';" // Allow inline scripts and unsafe-eval
          },
        ],
      },
    ];
  },
};

export default nextConfig;
