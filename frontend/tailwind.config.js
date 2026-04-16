/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95))',
      }
    },
  },
  plugins: [],
}