import type { Config } from "tailwindcss";

/**
 * Grey Falcon Labs design tokens.
 *
 * Palette philosophy: a deep graphite base with an amber-gold -> orange
 * primary accent (evokes gold / XAUUSD and the "falcon"), steel-cyan as a
 * secondary, and emerald / rose reserved for positive / negative P&L.
 */
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Base surfaces (graphite)
        ink: {
          950: "#07090d",
          900: "#0a0d12",
          850: "#0e1218",
          800: "#12161d",
          700: "#1a1f28",
          600: "#242a35",
          500: "#333b48",
        },
        // Primary brand accent: falcon amber -> gold
        gold: {
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#ea8a04",
        },
        ember: {
          500: "#f97316",
          600: "#ea580c",
        },
        // Secondary accent: steel cyan
        steel: {
          400: "#38bdf8",
          500: "#0ea5e9",
        },
        // Financial semantics
        gain: "#34d399",
        loss: "#fb7185",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        container: "1200px",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(245,158,11,0.45)",
        "glow-cyan": "0 0 60px -18px rgba(56,189,248,0.45)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 48px -24px rgba(0,0,0,0.7)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        "ticker-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-dot": "pulse-dot 1.8s ease-in-out infinite",
        "ticker-scroll": "ticker-scroll 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
