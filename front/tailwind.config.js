/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`
    ],
  theme: {
    colors: {
      'primary': '#FD2D01',
      'secondary': '#FFD7D7',
      'third': '#4E5166',
      'white': '#ffffff',
      'green-alert': '#059669',
      'red-alert': '#dc2626',
      'warning-alert': '#d59f25',
    },
    fontFamily: {
      sans: ["Nunito Sans", "sans-serif"],
    },
    screens: {
      'sm': [
        {'min': '0px', 'max': '766px'},
      ],
      'md': [
        {'min': '668px', 'max': '767px'},
      ],
      'mg': [
        {'min': '768px', 'max': '1000px'},
      ],
      'computer': [
        {'min': '768px'},
      ],
      'lg': '1100px',
      'xl': '1400px',
    },
    extend: {},
  },
  plugins: [],
}
