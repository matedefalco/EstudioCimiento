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
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        // Shell palette (onboarding / quote flow — stays EC branded)
        steel:    "#1E2530",
        surface:  "#2A323F",
        copper:   "#D89149",
        grayCold: "#8A93A0",
        cream:    "#F2F0EA",

        // Dashboard theme tokens (set via CSS vars per palette + style)
        "tc-bg":          "var(--tc-bg)",
        "tc-card":        "var(--tc-card)",
        "tc-sub":         "var(--tc-sub)",
        "tc-border":      "var(--tc-border)",
        "tc-ink":         "var(--tc-ink)",
        "tc-soft":        "var(--tc-soft)",
        "tc-accent":      "var(--tc-accent)",
        "tc-accent-fg":   "var(--tc-accent-fg)",
        "tc-sidebar":     "var(--tc-sidebar)",
        "tc-sidebar-text":"var(--tc-sidebar-text)",
        "tc-sidebar-soft":"var(--tc-sidebar-soft)",

        // Semantic / functional (always the same regardless of theme)
        success: { DEFAULT: "#3E8460", bg: "#E3EFE6" },
        danger:  { DEFAULT: "#B5524A", bg: "#F3E3E0" },
        warning: { DEFAULT: "#B5863C", bg: "#F1E7D3" },
        info:    { DEFAULT: "#3E6FA8", bg: "#E2EAF2" },
        muted:   { DEFAULT: "#7A7468", bg: "#EAE5D9" },
        violet:  { DEFAULT: "#6B5B95", bg: "#E9E5F0" },
      },
      borderRadius: {
        theme: "var(--tc-r, 12px)",
        "theme-sm": "calc(var(--tc-r, 12px) * 0.65)",
        "theme-xs": "calc(var(--tc-r, 12px) * 0.45)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        theme: "var(--tc-shadow, none)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
