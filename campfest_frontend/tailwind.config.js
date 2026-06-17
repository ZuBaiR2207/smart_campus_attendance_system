export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "slide-in": "slideIn 0.4s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
      },
    },
  },
  plugins: [],
}