/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#101B2B",
        surface: "#162338",
        'surface-hover': "#1C2D47",
        'surface-elevated': "#203452",
        primary: "#54D6B0",
        'primary-dark': "#3CB994",
        secondary: "#3EA698",
        accent: "#FF5C75",
        warning: "#FFB03A",
        muted: "#8E9CAE",
        success: "#54D6B0",
        cloud: "#F3F5F7",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
