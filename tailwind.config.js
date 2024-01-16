/** @type {import('tailwindcss').Config} */
const jumpu = require("@jumpu-ui/tailwindcss");
const typography = require("@tailwindcss/typography");
const { addDynamicIconSelectors } = require("@iconify/tailwind");
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      jumpu: {
        prefix: "",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          lg: "1rem",
          xl: "1rem",
        },
      },
    },
  },
  plugins: [...jumpu, typography, addDynamicIconSelectors()],
};
