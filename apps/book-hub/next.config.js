/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placeimg.com'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
