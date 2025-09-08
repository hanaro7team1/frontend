import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = __dirname;
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sido-upload.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
};

export default nextConfig;
