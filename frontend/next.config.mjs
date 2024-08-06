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
