/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(258 90% 54%)',
        accent: 'hsl(190 85% 50%)',
        bg: 'hsl(230 60% 14%)',
        surface: 'hsl(234 40% 18%)',
        'surface-light': 'hsl(234 35% 22%)',
        'surface-lighter': 'hsl(234 30% 26%)',
        'text-primary': 'hsl(0 0% 98%)',
        'text-secondary': 'hsl(0 0% 70%)',
        'text-muted': 'hsl(0 0% 50%)',
        border: 'hsl(234 35% 22%)',
        'border-light': 'hsl(234 30% 26%)',
        'border-lighter': 'hsl(234 25% 30%)',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '20px',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '32px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(0,0%,0%,0.12)',
        'card-hover': '0 12px 32px hsla(0,0%,0%,0.18)',
        'button': '0 4px 12px hsla(0,0%,0%,0.15)',
        'button-hover': '0 6px 16px hsla(0,0%,0%,0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 250ms cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 250ms cubic-bezier(0.22,1,0.36,1)',
        'scale-in': 'scaleIn 150ms cubic-bezier(0.22,1,0.36,1)',
        'bounce-subtle': 'bounceSubtle 600ms cubic-bezier(0.22,1,0.36,1)',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
      },
    },
  },
  plugins: [],
}
