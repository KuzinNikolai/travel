import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--background)",
          400: "var(--background-400)",
        },
        
        primary: {
          DEFAULT: "var(--primary)",
          400: "var(--primary-400)",
          100: "var(--primary-100)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          // 400: "var(--secondary-400)",
        },

        accent: "var(--accent)",
        success: "var(--success)",
        danger: "var(--danger)",
        star: "var(--star)",
        border: "var(--border)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        loading: {
          to: {
            backgroundPosition: "100% 0, 0 0, 0 50%,  0 100%, 100% 100%",
          }
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config