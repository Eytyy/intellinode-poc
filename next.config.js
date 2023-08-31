/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'oaidalleapiprodscus.blob.core.windows.net',
      'avatars.githubusercontent.com',
    ],
  },
};

module.exports = nextConfig;
