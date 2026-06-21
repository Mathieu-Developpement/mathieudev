/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "md-black": "#0a0a0a",
        "md-dark": "#111111",
        "md-card": "#161616",
        "md-border": "#1e1e1e",
        "md-blue-bright": "#00aaff",
        "md-blue-mid": "#0066cc",
        "md-blue-deep": "#003a8c",
        "md-cyan": "#00d4ff",
        "md-text": "#e8e8e8",
        "md-muted": "#888888",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-blue": "linear-gradient(135deg, #00aaff 0%, #0066cc 50%, #003a8c 100%)",
        "gradient-glow": "radial-gradient(ellipse at center, rgba(0,170,255,0.15) 0%, transparent 70%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "scan": "scan 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scan: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 100%" },
        },
      },
    },
  },
  plugins: [],
};
