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
        teal: {
          700: '#0F766E',
          600: '#0D9488',
          500: '#14B8A6',
          400: '#2DD4BF',
          100: '#CCFBF1',
          50: '#F0FDFA',
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
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.7)',
        'glass-dark': 'rgba(30, 41, 59, 0.5)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'lg-glow': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 60px rgba(0, 0, 0, 0.1)',\n        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',\n        'glow-teal': '0 0 24px -4px rgba(20, 184, 166, 0.25)',\n        'glow-red': '0 0 24px -4px rgba(239, 68, 68, 0.25)',\n        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',\n        'card-hover': '0 4px 16px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.04)',\n        'elevated': '0 8px 30px rgba(0,0,0,0.08)',\n        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.06)',\n        'sidebar': 'inset -1px 0 0 rgba(255,255,255,0.04)',\n      },\n      animation: {\n        'fade-in': 'fadeIn 0.5s ease-out',\n        'fade-in-up': 'fadeInUp 0.6s ease-out',\n        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',\n        'slide-down': 'slideDown 0.3s ease-out',\n        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',\n        'shimmer': 'shimmer 2s linear infinite',\n        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',\n        'float': 'float 6s ease-in-out infinite',\n        'bounce-slow': 'bounceSlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',\n        'glow-border': 'glowBorder 3s ease-in-out infinite',\n      },\n      keyframes: {\n        fadeIn: {\n          '0%': { opacity: '0' },\n          '100%': { opacity: '1' },\n        },\n        fadeInUp: {\n          '0%': { opacity: '0', transform: 'translateY(16px)' },\n          '100%': { opacity: '1', transform: 'translateY(0)' },\n        },\n        slideUp: {\n          '0%': { opacity: '0', transform: 'translateY(24px)' },\n          '100%': { opacity: '1', transform: 'translateY(0)' },\n        },\n        slideDown: {\n          '0%': { opacity: '0', transform: 'translateY(-12px)' },\n          '100%': { opacity: '1', transform: 'translateY(0)' },\n        },\n        scaleIn: {\n          '0%': { opacity: '0', transform: 'scale(0.95)' },\n          '100%': { opacity: '1', transform: 'scale(1)' },\n        },\n        shimmer: {\n          '0%': { backgroundPosition: '-200% 0' },\n          '100%': { backgroundPosition: '200% 0' },\n        },\n        pulseGlow: {\n          '0%, 100%': { opacity: '1' },\n          '50%': { opacity: '0.6' },\n        },\n        float: {\n          '0%, 100%': { transform: 'translateY(0px)' },\n          '50%': { transform: 'translateY(-8px)' },\n        },\n        bounceSlow: {\n          '0%, 100%': { transform: 'translateY(0)' },\n          '50%': { transform: 'translateY(-10px)' },\n        },\n        glowBorder: {\n          '0%, 100%': { borderColor: 'rgba(20, 184, 166, 0.5)' },\n          '50%': { borderColor: 'rgba(20, 184, 166, 0.1)' },\n        },\n      },\n      backgroundImage: {\n        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',\n        'sidebar-gradient': 'linear-gradient(180deg, #060a14 0%, #0d1526 50%, #0a1320 100%)',\n      },\n    },\n  },\n  plugins: [],\n};\n\nexport default config;
