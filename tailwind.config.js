/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./src/app/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        parkGreen: "#2F4730",
        parkTan: "#D9C9A3",
        parkBrown: "#7A5C3A",
        parkPaper: "#F4F1E8",
        parkInk: "#1E2A1B",
        ok: "#16a34a",
        warn: "#f59e0b",
        shut: "#94a3b8"
      },
      fontFamily: {
        inter: ["Inter", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};
