/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#ffb607",
        "primary-black": "#212427",
        "primary-white": "#F5F5FA",

      },
    },
  },
  plugins: [],
}
