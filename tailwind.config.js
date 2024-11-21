/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0f0f0f",
          white: "#fff",
          gold: "#DAA520",
        },
        utils: {
          green: "#20DAA5",
        },
      },
      fontFamily: {
        jacquard: ["jacquard-24", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        slideUpSuperSlow2: "slideUp 1.1s ease-in-out",
        slideUpSuperSlow1: "slideUp 0.9s ease-in-out",
        slideUpSlow: "slideUp 0.7s ease-in-out",
        slideUp: "slideUp 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
