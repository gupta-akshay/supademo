import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['i.ytimg.com', 'yt3.ggpht.com'], // Allow YouTube thumbnail images
  },
};

export default nextConfig;
