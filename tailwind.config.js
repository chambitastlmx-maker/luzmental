/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"  // por si llegas a usar el app router más adelante
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
