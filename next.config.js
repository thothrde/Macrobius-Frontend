/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  experimental: {
    optimizeCss: true,
    turbo: {
      memoryLimit: 512,
    },
  },
  
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Configure build output
  output: 'standalone',
  
  // Bundle optimization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Bundle analyzer for production builds
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: isServer ? '../analyze/server.html' : './analyze/client.html',
          openAnalyzer: false,
        })
      );
    }

    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\/]node_modules[\/]/,
            name: 'vendors',
            priority: 10,
            chunks: 'all',
          },
          three: {
            test: /[\/]node_modules[\/](three|@react-three)[\/]/,
            name: 'three',
            priority: 20,
            chunks: 'all',
          },
          ui: {
            test: /[\/]node_modules[\/](@radix-ui|lucide-react)[\/]/,
            name: 'ui',
            priority: 15,
            chunks: 'all',
          },
        },
      };
    }

    return config;
  },
  
  // Environment variables for Oracle Cloud integration
  env: {
    ORACLE_BACKEND_URL: process.env.ORACLE_BACKEND_URL || 'http://152.70.184.232:8080',
    AI_LEARNING_ENGINE_URL: process.env.AI_LEARNING_ENGINE_URL || 'http://152.70.184.232:8080/ai',
    WEBSOCKET_URL: process.env.WEBSOCKET_URL || 'ws://152.70.184.232:8080/ws',
    ANALYTICS_ENDPOINT: process.env.ANALYTICS_ENDPOINT || 'http://152.70.184.232:8080/analytics',
  },
  
  // Image optimization
  images: {
    domains: ['152.70.184.232'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // PWA and caching configuration
  async rewrites() {
    return [
      {
        source: '/api/oracle/:path*',
        destination: 'http://152.70.184.232:8080/:path*',
      },
    ];
  },
  
  // Performance optimizations
  swcMinify: true,
  modularizeImports: {
    '@react-three/drei': {
      transform: '@react-three/drei/{{member}}',
    },
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Experimental features for better performance
  experimental: {
    serverComponentsExternalPackages: ['three'],
    optimizeCss: true,
  },
};

module.exports = nextConfig;