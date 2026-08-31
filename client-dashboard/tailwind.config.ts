import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        navy: {
          50: '#f0f3f9',
          100: '#dae1ef',
          200: '#bcc8df',
          300: '#94a3c4',
          400: '#6b7da5',
          500: '#4f6289',
          600: '#3e4f72',
          700: '#2d3a57',
          800: '#1a2540',
          900: '#0d1526',
          950: '#060a14',
        },
      },
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.7)',
        'glass-dark': 'rgba(30, 41, 59, 0.5)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      boxShadow: {
        'lg-glow': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 60px rgba(0, 0, 0, 0.1)',
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounceSlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow-teal': '0 0 24px -4px rgba(20, 184, 166, 0.25)',
        'glow-red': '0 0 24px -4px rgba(239, 68, 68, 0.25)',
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.04)',
        'elevated': '0 8px 30px rgba(0,0,0,0.08)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.06)',
        'sidebar': 'inset -1px 0 0 rgba(255,255,255,0.04)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'sidebar-gradient': 'linear-gradient(180deg, #060a14 0%, #0d1526 50%, #0a1320 100%)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;
