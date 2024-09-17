import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { i18nConfig } from "@share/i18n"
import { serverFetcher } from "@share/packages/fetcher"
import { detailCitySchema } from "../model/schema/schema"

export async function getDetailCity(citySlug: string, lang = i18nConfig.defaultLocale) {
	return await serverFetcher({
		name: "getDetailCity",
		url: `${API_DOMAIN}/${lang}/api/v1/cities/city/${citySlug}`,
		method: "GET",
		responseSchema: detailCitySchema,
	})
}
