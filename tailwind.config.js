// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/(alert|autocomplete|avatar|badge|button|card|chip|divider|drawer|dropdown|form|image|input|link|modal|navbar|popover|select|skeleton|spinner|toggle|tabs|toast|ripple|listbox|scroll-shadow|menu).js"
],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};