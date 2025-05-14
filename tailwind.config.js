/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./views/**/*.ejs"
    ],
    theme: {
      extend: {
        colors: {
          primary: "#4F46E5",
          secondary: "#374151",
        },
        fontFamily: {
          sans: ["Inter","sans-serif"],
          heading: ["Poppins","sans-serif"],
        },
      },
    },
    plugins: [],
  };
  