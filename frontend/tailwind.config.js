/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef7ee",
          100: "#fdedd6",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
        },
        sweet: {
          50: "#fefce8",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
        },
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
        "pulse-slow": "pulse 3s infinite",
      },
    },
  },
  plugins: [],
};
