/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      lg: [
        "36px",
        { lineHeight: "33px", letterSpacing: "-1", fontWeight: "700" },
      ],
      base: [
        "24px",
        { lineHeight: "22px", letterSpacing: "-0.75", fontWeight: "700" },
      ],
      sm: [
        "15px",
        { lineHeight: "24px", letterSpacing: "-0.25", fontWeight: "700" },
      ],
      "sm-variant": [
        "15px",
        { lineHeight: "15px", letterSpacing: "-0.25", fontWeight: "700" },
      ],
      body: [
        "13px",
        { lineHeight: "15px", letterSpacing: "-0.1", fontWeight: "500" },
      ],
      "body-variant": [
        "13px",
        { lineHeight: "15px", letterSpacing: "-0.25", fontWeight: "500" },
      ],
    },
    extend: {
      colors: {
        invoicify: {
          "01": "#7C5DFA",
          "02": "#9277FF",
          "03": "#1E2139",
          "04": "#252945",
          "05": "#DFE3FA",
          "06": "#888EB0",
          "07": "#7E88C3",
          "08": "#0C0E16",
          "09": "#EC5757",
          10: "#FF9797",
          11: "#F8F8FB",
          12: "#141625",
        },
      },
    },
  },
  plugins: [],
};
