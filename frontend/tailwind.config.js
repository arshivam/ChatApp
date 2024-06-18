/** @type {import('tailwindcss').Config} */
// import daisyui from "daisyui"
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [ require('daisyui'),],
}