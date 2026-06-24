import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-hanken)", "system-ui", "sans-serif"],
      },
      colors: {
        // Paleta noche (shell)
        steel: "#1E2530",
        surface: "#2A323F",
        surface2: "#323b4a",
        copper: "#D89149",
        grayCold: "#8A93A0",
        cream: "#F2F0EA",
        // Paleta día (dashboard)
        panel: {
          bg: "#F4F0E8",
          surface: "#FFFFFF",
          ink: "#1C1E22",
          line: "#E7E1D3",
        },
        // Estados funcionales
        success: { DEFAULT: "#3E8460", bg: "#E3EFE6" },
        danger:  { DEFAULT: "#B5524A", bg: "#F3E3E0" },
        warning: { DEFAULT: "#B5863C", bg: "#F1E7D3" },
        info:    { DEFAULT: "#3E6FA8", bg: "#E2EAF2" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
