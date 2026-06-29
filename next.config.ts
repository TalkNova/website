import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/google5a2c0500c9d9d78d.html',
          destination: '/google-site-verification'
        },
      ],
    };
  },
  async redirects() {
    return [
      { source: '/privacy-policy.html', destination: '/privacy-policy', permanent: true },
      {
        source: '/terms-and-conditions.html',
        destination: '/terms-and-conditions',
        permanent: true,
      },
      { source: '/login', destination: 'https://app.thatmatters.in/', permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'i.pravatar.cc', pathname: '/**' },
      {
        protocol: 'https',
        hostname: 'thatmatters.s3.ap-south-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  devIndicators: {
    position: 'bottom-left',
  },
};

export default nextConfig;
