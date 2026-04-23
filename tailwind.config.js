/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ivory: '#FBF7F0',
        cream: '#F5EDE1',
        champagne: '#E9D9B8',
        gold: '#C9A96E',
        goldDark: '#A07F49',
        blush: '#E8CFC9',
        sage: '#B5BFA1',
        ink: '#2B2622',
        muted: '#7A6F63',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(160, 127, 73, 0.25)',
        glow: '0 0 60px rgba(201, 169, 110, 0.35)',
      },
      backgroundImage: {
        'ornate-divider':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='20' viewBox='0 0 120 20'%3E%3Cpath d='M0 10 Q15 0 30 10 Q45 20 60 10 Q75 0 90 10 Q105 20 120 10' fill='none' stroke='%23C9A96E' stroke-width='1.5'/%3E%3Ccircle cx='60' cy='10' r='3' fill='%23C9A96E'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 169, 110, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(201, 169, 110, 0.5)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out both',
        shimmer: 'shimmer 2.5s linear infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

