import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
      {
        protocol: 'https',
        hostname: 's3.ap-south-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  devIndicators: {
    position: 'bottom-left',
  },
};

export default nextConfig;
