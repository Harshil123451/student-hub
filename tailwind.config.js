/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#FBFBFB",
          200: "#c2c7ca",
          300: "#b8bcbf",
          400: "#999999",
          500: "#7F7F7F",
          600: "#666666",
          700: "#4C4C4C",
          800: "#121212",
          900: "#191919",
        },
        'pastel-blue': '#A7C7E7',
        'pastel-pink': '#FFB6C1',
        'pastel-purple': '#E6E6FA',
        'pastel-green': '#98FB98',
        'pastel-yellow': '#FFFACD',
        'pastel-orange': '#FFDAB9',
      },
      fontFamily: {
        display: ['var(--font-comic-neue)', 'cursive'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
