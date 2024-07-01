import type { MetadataRoute } from "next"

const robots = (): MetadataRoute.Robots => ({
	rules: [
		{
			userAgent: "*",
			allow: "/",
			disallow: "/admin",
		},
		// Block AI BOTS
		// {
		//   userAgent: [""],
		//   disallow: "/",
		// },
	],
	sitemap: "https://acme.com/sitemap.xml",
})

export default robots
