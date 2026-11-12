/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colors come from CSS variables so every clinic can have its own theme (see src/index.css + App.jsx)
        brand: {
          light: '#F6F2E4',
          silver: '#E4DEC7',
          slate: '#525D3F',
          dark: 'rgb(var(--brand-dark) / <alpha-value>)',
          cardDark: 'rgb(var(--brand-card) / <alpha-value>)',
          accent: 'rgb(var(--brand-accent) / <alpha-value>)',
          accentHover: 'rgb(var(--brand-accent-hover) / <alpha-value>)',
          gold: 'rgb(var(--brand-gold) / <alpha-value>)',
          goldHover: 'rgb(var(--brand-gold) / <alpha-value>)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
