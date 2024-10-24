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
      backgroundColor: {
        button: 'var(--button-bg)',
        'button-hover': 'var(--button-hover)',
        'button-focus': 'var(--button-focus)',
        'button-pressed': 'var(--button-pressed)',
        'button-disabled': 'var(--button-disabled)',
      },
      colors: {
        'custom-bg': '#FBFBF9',
        'custom-text': '#21093A',
      },
    },
  },
  plugins: [],
};
