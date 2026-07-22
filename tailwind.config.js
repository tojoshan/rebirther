/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        institutional: {
          primary: '#17479d',
          secondary: '#00adee',
          dark: '#0a101d',
          darker: '#050810',
          light: '#f0f5ff',
          border: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['"PT Sans"', 'sans-serif'],
        narrow: ['"PT Sans Narrow"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
