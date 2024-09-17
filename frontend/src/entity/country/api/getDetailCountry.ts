import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { i18nConfig } from "@share/i18n"
import { serverFetcher } from "@share/packages/fetcher"
import type { I18NConfig } from "next/dist/server/config-shared"
import { detailCountrySchema } from "../consts/schema"

export const getDetailCountry = async (countrySlug: string, lang: I18NConfig["locales"][number] = i18nConfig.defaultLocale) => {
	return await serverFetcher({
		name: "getDetailCountry",
		url: `${API_DOMAIN}/${lang}/api/v1/country/${countrySlug}`,
		method: "GET",
		responseSchema: detailCountrySchema,
	})
}