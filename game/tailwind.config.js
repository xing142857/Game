/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '30': 'repeat(30, minmax(0, 1fr))',
        '40': 'repeat(40, minmax(0, 1fr))',
        '60': 'repeat(60, minmax(0, 1fr))',
        '70': 'repeat(70, minmax(0, 1fr))',
        '100': 'repeat(100, minmax(0, 1fr))',
      },
      colors: {
        'republican': '#610a0d',
        'democratic': '#00405b',
      },
      width: {
        '540px': '540px',
        '807px': '807px',
      }
    }
  },
  plugins: [],
}

