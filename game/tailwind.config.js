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
        '810px': '810px',
        '0px': '0px',
        '1.5px': '1.5px',
        '3px': '3px',
        '4.5px': '4.5px',
        '6px': '6px',
        '7.5px': '7.5px',
        '9px': '9px',
        '10.5px': '10.5px',
        '12px': '12px',
        '13.5px': '13.5px',
        '15px': '15px',
        '16.5px': '16.5px',
        '18px': '18px',
        '19.5px': '19.5px',
        '21px': '21px',
        '22.5px': '22.5px',
        '24px': '24px',
        '25.5px': '25.5px',
        '27px': '27px',
        '28.5px': '28.5px',
        '30px': '30px',
        '42px': '42px',
        '45px': '45px',
        '60px': '60px',
        '81px': '81px',
      }
    }
  },
  plugins: [],
}

