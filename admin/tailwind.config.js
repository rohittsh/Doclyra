/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors:{
        'primary': '#1B4B91',
        'ink': '#0B2545',
        'gold': '#B8862E',
        'canvas': '#F6F8FC',
        'slate-brand': '#55607A'
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'serif'],
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}