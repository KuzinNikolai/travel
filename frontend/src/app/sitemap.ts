import { API_DOMAIN } from "@/packages/API/constants"
import type { MetadataRoute } from "next"

export const dynamic = "force-dynamic"

const sitemap = async (): Promise<MetadataRoute.Sitemap> => [
	{
		url: `${API_DOMAIN}`,
		lastModified: new Date(),
		changeFrequency: "daily",
		priority: 1,
	},
]

export default sitemap
