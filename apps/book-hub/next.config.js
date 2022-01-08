const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')(['ui'])
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  swcMinify: true,
  images: {
    domains: [
      'abs.twimg.com',
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'platform-lookaside.fbsbx.com',
      'avatars.dicebear.com',
    ],
  },
}

module.exports = withPlugins(
  [
    [withBundleAnalyzer],
    [[withTM, { reactStrictMode: true }]],
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
          runtimeCaching,
          disable: process.env.NODE_ENV === 'development',
        },
      },
    ],
  ],
  nextConfig,
)
