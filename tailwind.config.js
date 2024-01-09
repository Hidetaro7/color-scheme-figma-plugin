/** @type {import('tailwindcss').Config} */
const jumpu = require("@jumpu-ui/tailwindcss");
const typography = require("@tailwindcss/typography");
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      jumpu: {
        prefix: "",
      },
    },
  },
  plugins: [...jumpu, typography],
};
