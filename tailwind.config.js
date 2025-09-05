/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#0E4174',
        secondary: '#0477BA',
        accent: '#79B2D7',
        error: '#FF5252',
        info: '#2196F3',
        success: '#78ba56',
        warning: '#FFC107',
        purple: '#BA68C8',
        refresh: '#d9eaf3',
      },
      colors: {
        primary: '#0E4174',
        secondary: '#0477BA',
        accent: '#79B2D7',
        error: '#FF5252',
        info: '#2196F3',
        success: '#78ba56',
        warning: '#FFC107',
        purple: '#BA68C8',
        refresh: '#d9eaf3',
      }
    },
  },
  plugins: [],

}
