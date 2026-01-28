import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Initialize the next-intl plugin (it automatically looks for src/i18n/request.ts)
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
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
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@tabler/icons-react',
      'framer-motion',
      'motion',
      '@react-three/drei',
    ],
  },
  compress: true,
};

export default withNextIntl(nextConfig);
