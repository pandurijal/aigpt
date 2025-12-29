/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  env: {
    BYTEPLUS_API_KEY: process.env.BYTEPLUS_API_KEY,
    BYTEPLUS_ENDPOINT: process.env.BYTEPLUS_ENDPOINT,
  },
}

module.exports = nextConfig
