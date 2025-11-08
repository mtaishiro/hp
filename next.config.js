/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  distDir: 'out',
  eslint: {
    // Disable ESLint during builds to avoid circular structure error
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

