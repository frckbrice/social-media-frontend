/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig = {
  // other congigs
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "images.pexels.com,",
      },
      {
        hostname: "firebasestorage.googleapis.com",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "images.pexels.com",
      },
      {
        hostname: "www.google.com",
      },
      {
        hostname: "static.startuptalky.com",
      },
      {
        hostname: "cdn.jsdelivr.net",
      },
      {
        hostname: "xkwspfurbsmpwwazlkmu.supabase.co",
      },
      {
        hostname: "media.istockphoto.com",
      },
      {
        hostname: "i.pinimg.com",
      },
      {
        hostname: "bestcompaniesaz.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "cdn1.iconfinder.com",
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
