/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./public/**/*.{js,css}"],
  theme: {
    extend: {
      colors: {
        primary:   "#0ea5e9",  // sky-500
        secondary: "#10b981",  // emerald-500
        accent:    "#fcd34d"   // amber-400
      },
      fontFamily: {
        sans:    ["Inter","sans-serif"],
        heading: ["Poppins","sans-serif"]
      }
    }
  },
  plugins: []
};
