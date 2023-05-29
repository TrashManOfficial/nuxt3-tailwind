/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    screens: {
      ph: { max: "768px" },
    },
    extend: {
      colors: {
        primary: "rgba(17, 164, 175, 1)",
        secondary: "rgba(217, 79, 20, 1)",
      },
      backgroundImage: {
        searchBarBackground: "url('~/assets/images/searchBg.jpg')",
      },
      fontFamily: {
        trsFontFace: ["trsFontFace"],
      },
      keyframes: {
        "slide-down": {
          from: {
            transform: "translateY(-2rem)",
          },
          to: {
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "slide-down": "slide-down 300ms ease-in-out both",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
}

