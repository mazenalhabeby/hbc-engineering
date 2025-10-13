import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Initialize the next-intl plugin (it automatically looks for src/i18n/request.ts)
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    // Alternative: domains: ['assets.aceternity.com', 'images.unsplash.com']
  },
};

export default withNextIntl(nextConfig);
