/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  env: {
	  NEXT_PUBLIC_TILE_DOMAIN: process.env.TILE_DOMAIN,
  },	
};


module.exports = nextConfig
