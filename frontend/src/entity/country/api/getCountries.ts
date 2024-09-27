import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { i18nConfig } from "@share/i18n"
import { serverFetcher } from "@share/packages/fetcher"
import { countryItemSchema } from "@share/schemas"
import type { I18NConfig } from "next/dist/server/config-shared"

export async function getCountries(lang: I18NConfig["locales"][number] = i18nConfig.defaultLocale) {
	return await serverFetcher({
		name: "getCountries",
		url: `${API_DOMAIN}/${lang}/api/v1/countries/`,
		method: "GET",
		responseSchema: countryItemSchema.array(),
		errorReturn: [],
	})
}
