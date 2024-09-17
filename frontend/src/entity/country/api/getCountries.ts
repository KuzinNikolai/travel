import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { i18nConfig } from "@share/i18n"
import { serverFetcher } from "@share/packages/fetcher"
import type { I18NConfig } from "next/dist/server/config-shared"
import { countrySchema } from "../consts/schema"

export async function getCountries(lang: I18NConfig["locales"][number] = i18nConfig.defaultLocale) {
	return await serverFetcher({
		name: "getCountries",
		url: `${API_DOMAIN}/${lang}/api/v1/countries/`,
		method: "GET",
		responseSchema: countrySchema.array(),
		errorReturn: [],
	})
}
