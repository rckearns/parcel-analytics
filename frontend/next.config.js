/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
  },	
};


module.exports = nextConfig;
