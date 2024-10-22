/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
        bitter: ['"Bitter"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
