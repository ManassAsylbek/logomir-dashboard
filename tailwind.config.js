import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e6f7ed",
          100: "#c0ebd4",
          200: "#99debb",
          300: "#70d1a1",
          400: "#4ac68d",
          500: "#22bb79",
          600: "#1da969",
          700: "#178f57",
          800: "#127546",
          900: "#0a5130",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            success: {
              50: "#e6f7ed",
              100: "#c0ebd4",
              200: "#99debb",
              300: "#70d1a1",
              400: "#4ac68d",
              500: "#22bb79",
              600: "#1da969",
              700: "#178f57",
              800: "#127546",
              900: "#0a5130",
              DEFAULT: "#22bb79",
              foreground: "#ffffff",
            },
          },
        },
      },
    }),
  ],
};
