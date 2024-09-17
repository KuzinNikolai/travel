import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { i18nConfig } from "@share/i18n"
import { serverFetcher } from "@share/packages/fetcher"
import { cityItemSchema } from "../model/schema/schema"

export async function getCities(lang = i18nConfig.defaultLocale) {
	return await serverFetcher({
		name: "getCities",
		url: `${API_DOMAIN}/${lang}/api/v1/cities`,
		method: "GET",
		responseSchema: cityItemSchema.array(),
		errorReturn: [],
	})
}