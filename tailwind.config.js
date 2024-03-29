/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quote: ["Tangerine", "cursive"],
        dancing: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
}

