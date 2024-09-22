import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { serverFetcher } from "@share/packages/fetcher"
import { detailCountrySchema } from "@share/schemas"
import { getLocale } from "next-intl/server"

export const getDetailCountry = async (countrySlug: string) => {
	return await serverFetcher({
		name: "getDetailCountry",
		url: `${API_DOMAIN}/${await getLocale()}/api/v1/country/${countrySlug}`,
		method: "GET",
		responseSchema: detailCountrySchema,
	})
}
