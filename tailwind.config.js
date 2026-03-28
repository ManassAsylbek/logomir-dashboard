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
      screens: {
        xs: "480px",
      },
      fontFamily: {
        sans: [
          '"SF Pro Rounded"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },
      colors: {
        "mint-light": "#CFF2E8",
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
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        scroll: "scroll 15s linear infinite",
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
