import type { Config } from "tailwindcss"

function pxToEm(defaultRemInPx: number) {
	return (px: number) => px / defaultRemInPx
}

const pxToRem = pxToEm(16)

function clamp(minPx: number, view: number | string, maxPx: number) {
	const viewSize = typeof view === "string" ? view : `${view}vw`
	return `clamp(${pxToRem(minPx)}rem,${viewSize},${pxToRem(maxPx)}rem)`
}

const config = {
	darkMode: ["class"],
	content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "0.63rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontSize: {
				h1: [
					clamp(26, 4, 28),
					{
						fontWeight: "500",
						letterSpacing: `${pxToRem(-0.03)}em`,
						lineHeight: "1em",
					},
				],
				h2: [
					clamp(26, 4, 28),
					{
						fontWeight: "500",
						letterSpacing: `${pxToRem(-0.03)}em`,
						lineHeight: "1em",
					},
				],
				h3: [
					clamp(26, 3, 28),
					{
						fontWeight: "500",
						letterSpacing: `${pxToRem(-0.03)}em`,
						lineHeight: "1em",
					},
				],
				h4: [
					clamp(22, 2.5, 24),
					{
						fontWeight: "400",
						letterSpacing: `${pxToRem(-0.03)}em`,
						lineHeight: "1em",
					},
				],
				h5: [
					clamp(20, 2.5, 22),
					{
						fontWeight: "400",
						letterSpacing: `${pxToRem(-0.03)}em`,
						lineHeight: "1em",
					},
				],

				content1: [
					clamp(16, 6, 18),
					{
						fontWeight: "500",
						lineHeight: "1em",
						letterSpacing: `${pxToRem(-0.4)}em`,
					},
				],
				content2: [
					clamp(16, 6, 18),
					{
						fontWeight: "400",
						lineHeight: "1.1em",
						letterSpacing: `${pxToRem(-0.2)}em`,
					},
				],

				span: [
					"inherit",
					{
						fontWeight: "inherit",
						lineHeight: "1em",
						letterSpacing: "inherit",
					},
				],
				small: [
					clamp(14, 6, 16),
					{
						fontWeight: "400",
						letterSpacing: "inherit",
						lineHeight: `${pxToRem(-0.4)}em`,
					},
				],
				link: [
					"inherit",
					{
						fontWeight: "inherit",
						lineHeight: "1em",
						letterSpacing: "inherit",
					},
				],
				button: [
					clamp(16, 6, 18),
					{
						fontWeight: "500",
						lineHeight: "1em",
						letterSpacing: `${pxToRem(-0.4)}em`,
					},
				],
			},
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
					},
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
