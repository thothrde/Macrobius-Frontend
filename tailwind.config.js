/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Macrobius Color System
        'azure-blue': '#007BC7',
        'wine-red': '#722F37',
        'gold': '#FFD700',
        'dark-gold': '#B8860B',
        'light-azure': '#4A9FD4',
        'deep-wine': '#5A2429',
        
        // Extended palette
        'ai-pulse': '#00FF87',
        'oracle-connection': '#FF6B35',
        'realtime-indicator': '#FF0080',
      },
      fontFamily: {
        'latin': ['Times New Roman', 'Trajan Pro', 'serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'stars-animation': 'starsAnimation 20s linear infinite',
        'astrolabe-rotation': 'astrolabeRotation 60s linear infinite',
        'golden-pulse': 'goldenPulse 2s ease-in-out infinite alternate',
        'ai-pulse': 'aiPulse 1.5s ease-in-out infinite alternate',
        'connection-pulse': 'connectionPulse 2s ease-in-out infinite',
        'staggered-reveal': 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(40px) scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        starsAnimation: {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(-400px)',
          },
        },
        astrolabeRotation: {
          '0%': {
            transform: 'translate(-50%, -50%) rotate(0deg)',
          },
          '100%': {
            transform: 'translate(-50%, -50%) rotate(360deg)',
          },
        },
        goldenPulse: {
          '0%': {
            opacity: '0.7',
          },
          '100%': {
            opacity: '1',
          },
        },
        aiPulse: {
          '0%': {
            opacity: '0.6',
            transform: 'scale(1)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1.2)',
          },
        },
        connectionPulse: {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.6',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'golden': '0 0 35px rgba(255, 215, 0, 0.5)',
        'wine': '0 10px 30px rgba(114, 47, 55, 0.4)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}