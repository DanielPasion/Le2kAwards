// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#cdcdcd",
          300: "#b3b3b3",
          400: "#7f7f7f",
          500: "#4c4c4c",
          600: "#1f1f1f",
          700: "#181818",
          800: "#121212",
          900: "#0b0b0b",
          950: "#050505",
        },
        red: {
          50: "#fff5f5",
          100: "#ffe3e3",
          200: "#ffc9c9",
          300: "#ffa8a8",
          400: "#ff8787",
          500: "#ff6b6b",
          600: "#fa5252",
          700: "#f03e3e",
          800: "#e03131",
          900: "#c92a2a",
          950: "#a51111",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
