/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Configure build output (removed standalone for normal deployment)
  // output: 'standalone', // Only needed for containerized deployments
  
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
  
  // FIXED: Updated image optimization with modern remotePatterns
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '152.70.184.232',
        port: '8080',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '152.70.184.232',
        pathname: '/**',
      }
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Security headers with SVG support
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
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
          },
        ],
      },
      {
        source: '/public/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
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
  
  // Performance optimizations (swcMinify is now default in Next.js 15)
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
  
  // External packages configuration
  serverExternalPackages: ['three'],
  
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;