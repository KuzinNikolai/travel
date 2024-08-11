import type { Config } from "tailwindcss"
import type { ThemeConfig } from "tailwindcss/types/config"
import { CUSTOM_THEME_CONFIG } from "./src/app/configs/themeConfig"

export default {
	content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
	theme: CUSTOM_THEME_CONFIG as Partial<ThemeConfig>,
	prefix: "",
	plugins: [require("tailwindcss-animate")],
} satisfies Readonly<Config>
