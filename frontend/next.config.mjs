import analyser from "@next/bundle-analyzer"

const withBundleAnalyzer = analyser({
	enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.pravatar.cc",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "gettrip.co",
				pathname: "/media/**",
			},
		],
	},
}

export default withBundleAnalyzer(nextConfig)
