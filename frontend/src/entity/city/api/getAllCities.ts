import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { serverFetcher } from "@share/packages/fetcher"
import { cityItemSchema } from "@share/schemas"
import { getLocale } from "next-intl/server"

export async function getAllCities() {
	const locale = await getLocale()

	return await serverFetcher({
		name: "getPopularCities",
		url: `${API_DOMAIN}/${locale}/api/v1/cities`,
		method: "GET",
		responseSchema: cityItemSchema.array(),
		errorReturn: [],
	})
}