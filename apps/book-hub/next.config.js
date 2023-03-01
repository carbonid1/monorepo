/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placeimg.com'],
  },
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
}

module.exports = nextConfig
