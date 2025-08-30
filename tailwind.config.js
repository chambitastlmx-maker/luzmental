/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // si usas app router en el futuro
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0ea5e9",   // azul turquesa principal
          light: "#38bdf8",    // hover o backgrounds suaves
          dark: "#0284c7",     // para botones activos
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"], // fuente más moderna
      },
    },
  },
  plugins: [],
}
