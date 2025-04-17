/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.redd.it'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };
    return config;
  },
};

module.exports = nextConfig; 