/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          main: '#0A0E17',
          surface: '#1A1F2E',
        },
        brand: {
          cyan: '#00D4FF',
        }
      }
    },
  },
  plugins: [],
}