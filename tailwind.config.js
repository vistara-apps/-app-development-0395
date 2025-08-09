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
        'text-primary': 'hsl(0 0% 98%)',
        'text-secondary': 'hsl(0 0% 70%)',
        'text-muted': 'hsl(0 0% 50%)',
        border: 'hsl(234 35% 22%)',
        'border-light': 'hsl(234 30% 26%)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(0,0%,0%,0.12)',
        'card-hover': '0 12px 32px hsla(0,0%,0%,0.18)',
      },
      animation: {
        'fade-in': 'fadeIn 250ms cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 250ms cubic-bezier(0.22,1,0.36,1)',
        'scale-in': 'scaleIn 150ms cubic-bezier(0.22,1,0.36,1)',
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
      },
    },
  },
  plugins: [],
}