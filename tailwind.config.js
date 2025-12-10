/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#FFFFFF',
        'gray': '#DBDFDE',
        'blue': '#00E1FF',
        'black': '#000000',
        'light-gray': '#F0F0F0',
        'dark-gray': '#9F9F9F',
      },
    },
  },
  plugins: [],
}

