import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import type { MetadataRoute } from "next"

export const revalidate = 3200 // 1 hour
export const fetchCache = "force-cache"

const sitemap = async (): Promise<MetadataRoute.Sitemap> => [
	{
		url: `${API_DOMAIN}`,
		lastModified: new Date(),
		changeFrequency: "daily",
		priority: 1,
	},
]

export default sitemap
