/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
      },
      colors: {
        'premium': {
          'bg': '#F9F9F9',
          'bg-dark': '#F9F9F9',
          'surface': '#FFFFFF',
          'surface-light': '#FFFFFF',
          'text': '#0D0D0D',
          'text-light': '#5F758D',
          'text-muted': '#A0A8B5',
          'accent': '#5F758D',
          'accent-light': '#A0A8B5',
          'glass': 'rgba(255, 255, 255, 0.8)',
        }
      },
      boxShadow: {
        'premium': '8px 8px 16px #E0E0E0, -8px -8px 16px #FFFFFF',
        'premium-inset': 'inset 8px 8px 16px #E0E0E0, inset -8px -8px 16px #FFFFFF',
        'premium-lg': '12px 12px 24px #E0E0E0, -12px -12px 24px #FFFFFF',
        'premium-xl': '16px 16px 32px #E0E0E0, -16px -16px 32px #FFFFFF',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.05)',
        'button': '8px 8px 16px #E0E0E0, -8px -8px 16px #FFFFFF',
        'button-hover': '12px 12px 24px #E0E0E0, -12px -12px 24px #FFFFFF',
      },
      backdropBlur: {
        'xs': '2px',
        'premium': '20px',
      },
      borderRadius: {
        'premium': '32px',
        'premium-lg': '40px',
      },
      letterSpacing: {
        'tight': '-0.02em',
        'tighter': '-0.04em',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 4px 12px rgba(166, 140, 255, 0.3)' },
          '100%': { boxShadow: '0 8px 20px rgba(166, 140, 255, 0.5)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}