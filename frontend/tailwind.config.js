/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      keyframes: {
        grow: { '0%': { width: '0%' }, '100%': { width: '100%' } },
      },
      animation: {
        grow: 'grow 2.8s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}

