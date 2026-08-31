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
          950: '#020617',
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F1F5F9',
          50: '#F8FAFC',
        },
        green: {
          900: '#14532D',
          800: '#166534',
          700: '#15803D',
          600: '#16A34A',
          500: '#22C55E',
          400: '#4ADE80',
          300: '#86EFAC',
          200: '#BBF7D0',
          100: '#DCFCE7',
          50: '#F0FDF4',
        },
        teal: {
          700: '#15803D',
          600: '#16A34A',
          500: '#22C55E',
          400: '#4ADE80',
          100: '#DCFCE7',
          50: '#F0FDF4',
        },
        emerald: {
          600: '#059669',
          500: '#10B981',
          400: '#34D399',
          100: '#D1FAE5',
        },
        amber: {
          600: '#D97706',
          500: '#F59E0B',
          400: '#FBBF24',
          100: '#FEF3C7',
        },
        sky: {
          600: '#0284C7',
          500: '#0EA5E9',
          400: '#38BDF8',
          100: '#E0F2FE',
        },
        red: {
          700: '#B91C1C',
          600: '#DC2626',
          500: '#E53E3E',
          400: '#F87171',
          100: '#FEE2E2',
          50: '#FFF5F5',
        },
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
        'glow-border': 'glowBorder 3s ease-in-out infinite',
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
        glowBorder: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(22, 163, 74, 0.15)' },
          '50%': { boxShadow: '0 0 20px rgba(22, 163, 74, 0.35)' },
        },
      },
      boxShadow: {
        'glow-green': '0 0 24px -4px rgba(22, 163, 74, 0.25)',
        'glow-red': '0 0 24px -4px rgba(239, 68, 68, 0.25)',
        'glow-amber': '0 0 24px -4px rgba(245, 158, 11, 0.25)',
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.04)',
        'elevated': '0 8px 30px rgba(0,0,0,0.08)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-mesh': 'linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 25%, #F8FAFC 50%, #F0FDF4 75%, #FFFFFF 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;
