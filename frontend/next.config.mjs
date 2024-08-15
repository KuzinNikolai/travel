// @ts-check

import analyser from "@next/bundle-analyzer"
import createNextIntlPlugin from "next-intl/plugin"

const withBundleAnalyzer = analyser({
	enabled: process.env.ANALYZE === "true",
})

const withNextIntl = createNextIntlPlugin("./src/app/i18n/utils.ts")

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 60,
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "beta.gettrip.co",
				pathname: "/media/**",
			},
			{
				protocol: "https",
				hostname: "gettrip.co",
				pathname: "/media/**",
			},
		],
	},
}

export default withBundleAnalyzer(withNextIntl(nextConfig))
