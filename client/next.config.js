/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.dumu.co.ke', 'images.dumu.co.ke', 'localhost'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  productionBrowserSourceMaps: false,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  },
};

module.exports = nextConfig;
