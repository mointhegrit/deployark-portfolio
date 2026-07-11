/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1A1A18",
        ash: "#3C3C38",
        dust: "#888884",
        ember: "#C47B3A",
        grain: "#E8E6DF",
        paper: "#FAFAF9",
      },
      fontFamily: {
        display: ["DM Serif Display", "serif"],
        sans: ["DM Sans", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
      },
    },
  },
  plugins: [],
};
