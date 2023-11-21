/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-skyBlue": "#4c9aff",
        "custom-grey": "#ebecf0",
        "custom-white": "#ecf0eb80",
        "custom-pink": "#ffebe6",
        "hover-list": "#ecf0ebbf",
        "hover-card": "#8f8f8f",
        "hover-header": "#e3fcef",
      },
    },
  },
  plugins: [],
};
