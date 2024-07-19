import { Inter } from "next/font/google"

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	weight: ["400", "500", "600", "700", "800", "900"],
	preload: true,
	adjustFontFallback: true,
	display: "swap",
	style: "normal",
})

export { inter }
