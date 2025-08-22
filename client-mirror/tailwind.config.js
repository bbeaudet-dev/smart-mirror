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
        'mirror-xs': '1.5rem',    /* Increased from 0.75rem */
        'mirror-sm': '2rem',      /* Increased from 1rem */
        'mirror-base': '2.5rem',  /* Increased from 1.25rem */
        'mirror-lg': '3rem',      /* Increased from 1.5rem */
        'mirror-xl': '4rem',      /* Increased from 3.25rem */
        'mirror-2xl': '5rem',     /* Increased from 3.75rem */
      },
      spacing: {
        'mirror-gap': '30px',
        'mirror-body': '60px',
      }
    },
  },
  plugins: [],
}
