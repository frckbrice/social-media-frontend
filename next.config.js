/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn1.iconfinder.com",
      },
    ],
  },
};

module.exports = nextConfig;
