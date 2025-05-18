// tailwind.config.js
module.exports = {
  content: ["./views/**/*.ejs","./public/**/*.js"],
  theme: {
    extend: {
      colors: {
        darknav: "#111827",     // nearly-black nav
        accent:  "#FBBF24",     // yellow accent
        softy:   "#FFFBEB"      // light soft background
      },
      backgroundImage: {
        hero: "linear-gradient(135deg, rgba(255,251,235,1) 0%, rgba(255,243,205,1) 100%)"
      }
    }
  },
  plugins: []
}
