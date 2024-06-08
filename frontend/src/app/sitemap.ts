import { API_DOMAIN } from "@/packages/API/constants";
import { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => [
  {
    url: `${API_DOMAIN}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  },
];

export default sitemap;
