import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3A94F5",
          glow: "rgba(58, 148, 245, 0.4)",
        },
        accent: {
          DEFAULT: "#D5B168",
          glow: "rgba(213, 177, 104, 0.4)",
        },
        bg: {
          dark: "#001A3B",
          card: "#02234B",
          light: "#F9FAFB",
        },
        text: {
          main: "#111827",
          muted: "#6B7280",
          white: "#FFFFFF",
        },
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.03)",
          border: "rgba(255, 255, 255, 0.1)",
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
