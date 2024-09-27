// @ts-check

import analyser from "@next/bundle-analyzer"
import createMdx from "@next/mdx"
import createNextIntlPlugin from "next-intl/plugin"

const withBundleAnalyzer = analyser({
	enabled: process.env.ANALYZE === "true",
})

const withMDX = createMdx()

const withNextIntl = createNextIntlPlugin("./src/share/i18n/utils/intlUtils.ts")

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
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

export default withBundleAnalyzer(withMDX(withNextIntl(nextConfig)))
