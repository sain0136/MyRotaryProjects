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
<<<<<<< HEAD
  content: {
=======
  purge: {
>>>>>>> 404f9f39757a5a23d4d1f70904c49e775ba698fa
    enabled: process.env.NODE_ENV === "production",
    content: ["./public/**/*.html", "./src/**/*.vue"],
    options: {
      whitelistPatterns: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/,
      ],
    },
  },
  plugins: [],
}
