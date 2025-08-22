/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mirror-text': '#999',
        'mirror-text-dimmed': '#666',
        'mirror-text-bright': '#fff',
        'mirror-bg': '#000',
      },
      fontFamily: {
        'mirror-primary': ['Roboto Condensed', 'Roboto', 'sans-serif'],
        'mirror-secondary': ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'mirror-xs': '1.3rem',    /* Reduced by ~15% from 1.5rem */
        'mirror-sm': '1.7rem',    /* Reduced by ~15% from 2rem */
        'mirror-base': '2.1rem',  /* Reduced by ~15% from 2.5rem */
        'mirror-lg': '2.6rem',    /* Reduced by ~15% from 3rem */
        'mirror-xl': '3.4rem',    /* Reduced by ~15% from 4rem */
        'mirror-2xl': '4.3rem',   /* Reduced by ~15% from 5rem */
      },
      spacing: {
        'mirror-gap': '30px',
        'mirror-body': '60px',
      }
    },
  },
  plugins: [],
}
