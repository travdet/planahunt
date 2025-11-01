/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Removed output: 'export' to enable server features for login/weather
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
