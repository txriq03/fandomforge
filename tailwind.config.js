// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/(alert|avatar|badge|button|card|chip|divider|drawer|dropdown|form|image|input|link|modal|navbar|popover|skeleton|spinner|tabs|toast|ripple|menu).js"
],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};