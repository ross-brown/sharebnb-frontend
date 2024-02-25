/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat"]
      },
      screens: {
        "mdlg": "875px"
      }
    },
  },
  plugins: [],
};
