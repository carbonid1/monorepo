/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'page.ts'],
  images: {
    domains: ['placeimg.com'],
  },
}

module.exports = nextConfig
