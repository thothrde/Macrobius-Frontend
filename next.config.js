/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_ORACLE_URL: process.env.NEXT_PUBLIC_ORACLE_URL || 'http://152.70.184.232:8082',
    NEXT_PUBLIC_RAG_ENABLED: process.env.NEXT_PUBLIC_RAG_ENABLED || 'true',
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Macrobius',
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '2.0.0'
  },

  // Image optimization
  images: {
    domains: ['localhost', '152.70.184.232'],
    formats: ['image/webp', 'image/avif']
  },

  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Ignore mobile folder during web build
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src')
    };
    
    // Exclude mobile directory from compilation
    config.module.rules.push({
      test: /mobile\//,
      use: 'ignore-loader'
    });
    
    return config;
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/dashboard',
        permanent: true
      },
      {
        source: '/rag',
        destination: '/ki-rag-assistent',
        permanent: true
      }
    ];
  },

  // Rewrites for API proxy
  async rewrites() {
    return [
      {
        source: '/oracle-api/:path*',
        destination: 'http://152.70.184.232:8082/api/:path*'
      }
    ];
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ['@lucide/react', 'recharts'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      }
    }
  },

  // Output configuration
  output: 'standalone',
  trailingSlash: false,
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false
  },
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false
  },

  // Compression
  compress: true,
  
  // Power configuration
  poweredByHeader: false,
  
  // Generate sitemap
  generateBuildId: async () => {
    return `macrobius-${Date.now()}`;
  }
};

module.exports = nextConfig;