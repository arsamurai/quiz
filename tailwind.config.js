/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,ts}", "./node_modules/tw-elements/js/**/*.js"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        sm: "100%",
        lg: "968px",
      },
    },
    fontFamily: {
      "montserrat-light": ["Montserrat Light", "sans-serif"],
      "montserrat-regular": ["Montserrat Regular", "sans-serif"],
      "montserrat-medium": ["Montserrat Medium", "sans-serif"],
      "montserrat-semibold": ["Montserrat Semibold", "sans-serif"],
      "montserrat-bold": ["Montserrat Bold", "sans-serif"],
      helios: ["Helios Ext C", "sans-serif"],
    },
    extend: {
      colors: {
        white: "rgba(255, 255, 255, 1)",
        black: "rgba(0, 0, 0, 1)",
        green: "rgba(29, 76, 66, 1)",
        pink: "rgba(208, 166, 204, 1)",
        gray: "rgba(245, 245, 245, 0.44)",
        secondary: "rgba(217, 217, 217, 1)",
        "secondary-2": "rgba(217, 217, 217, 1)",
        primary: "rgba(129, 137, 118, 1)",
        "answer-0": "rgba(255, 99, 84, 1)",
        "answer-1": "rgba(255, 123, 81, 1)",
        "answer-2": "rgba(255, 143, 73, 1)",
        "answer-3": "rgba(255, 164, 66, 1)",
        "answer-4": "rgba(255, 184, 58, 1)",
        "answer-5": "rgba(243, 193, 51, 1)",
        "answer-6": "rgba(213, 198, 72, 1)",
        "answer-7": "rgba(173, 191, 91, 1)",
        "answer-8": "rgba(131, 185, 111, 1)",
        "answer-9": "rgba(102, 180, 125, 1)",
        "answer-10": "rgba(60, 174, 145, 1)",
      },
      backgroundImage: {
        marksGradient:
          "linear-gradient(180deg, #36AC93 0%, #FFCC33 48.98%, #FF9945 73.76%, #FF6358 100%)",
      },
      fontSize: {
        xs: ["0.75rem", "1.75rem"],
        base: ["1rem", "1.25rem"],
        "2xl": ["1.5rem", "1.75rem"],
        "6xl": ["4rem", "4.25rem"],
      },
      screens: {
        xs: "375px",
      },
      keyframes: {
        "slide-down": {
          "0%": {
            transform: "translateY(-25%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [require("tw-elements/plugin.cjs")],
}
