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
      }
    }
  },
  plugins: [],
}

