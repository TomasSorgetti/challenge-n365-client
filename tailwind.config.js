/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0d0b1f",
        secondary: "#F12C4C",
        green: "#04D47C",
      },
    },
  },
  plugins: [],
};
